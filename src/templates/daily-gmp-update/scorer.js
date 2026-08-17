import { cleanCompanyName, generateHashtag } from '../common.js';

/**
 * IPO Scoring Algorithm Module (for Daily GMP Update)
 * Implements the 100-Point Scoring Framework
 */

/**
 * 1. Grey Market Premium / Projected Gain (Max 35 Pts)
 */
export function calcGMPScore(gmpPercent) {
  const gmp = parseFloat(gmpPercent);
  if (isNaN(gmp) || gmp < 0) return 0;
  if (gmp <= 10) return 10;
  if (gmp <= 25) return 20;
  if (gmp <= 50) return 28;
  return 35;
}

/**
 * 2. QIB Bidding (Max 35 Pts) - Normalized by Day of offer
 */
export function calcQIBScore(qibSub, day = 3) {
  const qib = parseFloat(qibSub);
  if (isNaN(qib)) return 0;
  const d = parseInt(day) || 3;

  if (d === 1) {
    if (qib < 0.5) return 5;
    if (qib <= 2.0) return 15;
    if (qib <= 10.0) return 25;
    return 35;
  } else if (d === 2) {
    if (qib < 0.5) return 0;
    if (qib <= 2.0) return 10;
    if (qib <= 10.0) return 20;
    if (qib <= 30.0) return 30;
    return 35;
  } else {
    // Day 3 or closed/final
    if (qib < 0.5) return 0;
    if (qib <= 2.0) return 5;
    if (qib <= 10.0) return 15;
    if (qib <= 30.0) return 25;
    return 35;
  }
}

/**
 * 3. NII / HNI Subscription (Max 15 Pts)
 */
export function calcNIIScore(niiSub) {
  const nii = parseFloat(niiSub);
  if (isNaN(nii) || nii < 1.0) return 0;
  if (nii <= 5.0) return 5;
  if (nii <= 20.0) return 10;
  return 15;
}

/**
 * 4. Broader Market Mood (Max 10 Pts)
 */
export function calcMarketMoodScore(mood) {
  let points = 5;
  let classification = 'Cautious / Neutral';

  if (mood === 'bullish') {
    points = 10;
    classification = 'Bullish';
  } else if (mood === 'bearish') {
    points = 0;
    classification = 'Bearish';
  }

  return {
    points,
    classification
  };
}

/**
 * 5. Overall Subscription (Max 5 Pts)
 */
export function calcOverallScore(overallSub) {
  const sub = parseFloat(overallSub);
  if (isNaN(sub) || sub < 1.0) return 0;
  if (sub <= 5.0) return 2;
  if (sub <= 15.0) return 3.5;
  return 5;
}

/**
 * Calculate full score and 10-star rating
 */
export function evaluateIPO(data) {
  const gmpPts = calcGMPScore(data.gmpPercent);
  const qibPts = calcQIBScore(data.qibSub, data.biddingDay);
  const niiPts = calcNIIScore(data.niiSub);
  const moodResult = calcMarketMoodScore(data.marketMood);
  const overallPts = calcOverallScore(data.overallSub);

  const totalPoints = gmpPts + qibPts + niiPts + moodResult.points + overallPts;
  const starRating = Math.round((totalPoints / 10) * 10) / 10; // Round to 1 decimal place

  // Demand category
  let demandCategory = 'Weak Bidding / Caution Ahead';
  let badgeColor = 'negative';
  if (starRating >= 9.0) {
    demandCategory = 'Strong Demand / High Interest';
    badgeColor = 'strong';
  } else if (starRating >= 7.0) {
    demandCategory = 'Moderate Demand';
    badgeColor = 'moderate';
  } else if (starRating >= 5.0) {
    demandCategory = 'Neutral / Mixed Metrics';
    badgeColor = 'neutral';
  }

  // Estimated Lot Profit calculation
  const price = parseFloat(data.highPrice) || 0;
  const lotSize = parseInt(data.lotSize) || 0;
  const gmpPct = parseFloat(data.gmpPercent) || 0;
  const gmpVal = parseFloat(data.gmpValue) || (price * (gmpPct / 100));
  const estLotProfit = Math.round(gmpVal * lotSize);

  return {
    cleanedName: cleanCompanyName(data.companyName),
    hashtagName: generateHashtag(cleanCompanyName(data.companyName)),
    gmpPts,
    qibPts,
    niiPts,
    moodPts: moodResult.points,
    moodClassification: moodResult.classification,
    overallPts,
    totalPoints,
    starRating: starRating.toFixed(1),
    demandCategory,
    badgeColor,
    estLotProfit,
    gmpValueCalculated: Math.round(gmpVal * 10) / 10
  };
}
