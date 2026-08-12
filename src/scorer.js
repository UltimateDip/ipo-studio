/**
 * IPO Scoring Algorithm Module
 * Implements the 100-Point Scoring Framework from ipo_score_algo_2.txt
 */

export function cleanCompanyName(rawName) {
  if (!rawName) return '';
  let name = rawName.trim();
  // Remove common corporate suffixes (case-insensitive)
  const suffixes = [
    /\s+Private\s+Limited\b/gi,
    /\s+Pvt\.?\s+Ltd\.?\b/gi,
    /\s+Pvt\b/gi,
    /\s+Limited\b/gi,
    /\s+Ltd\.?\b/gi,
    /\s+Industries\b/gi,
    /\s+Technologies\b/gi,
    /\s+Technology\b/gi,
    /\s+Enterprises\b/gi,
    /\s+Corporation\b/gi,
    /\s+Corp\.?\b/gi,
    /\s+Services\b/gi,
    /\s+Solutions\b/gi,
    /\s+India\b/gi,
    /\s+International\b/gi,
    /\s+Holdings\b/gi,
    /\s+Capital\b/gi
  ];
  
  for (const regex of suffixes) {
    name = name.replace(regex, '');
  }
  
  // Clean punctuation and multiple spaces
  name = name.replace(/[,.-]+$/, '').trim();
  return name;
}

export function generateHashtag(cleanedName) {
  if (!cleanedName) return 'IPO';
  // Remove spaces and special characters for camelCase/PascalCase hashtag
  return cleanedName.replace(/[^a-zA-Z0-9]/g, '');
}

/**
 * 1. Grey Market Premium / Projected Gain (Max 35 Pts)
 * < 0% (Discount): 0 pts
 * 0% – 10%: 10 pts
 * 10% – 25%: 20 pts
 * 25% – 50%: 28 pts
 * > 50%: 35 pts
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
 * Day 1: <0.5x (5), 0.5-2x (15), 2-10x (25), 10-30x (35), >30x (35)
 * Day 2: <0.5x (0), 0.5-2x (10), 2-10x (20), 10-30x (30), >30x (35)
 * Day 3+: <0.5x (0), 0.5-2x (5), 2-10x (15), 10-30x (25), >30x (35)
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
 * < 1x: 0 pts
 * 1x – 5x: 5 pts
 * 5x – 20x: 10 pts
 * > 20x: 15 pts
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
 * Simplified: Bullish (10 pts), Neutral (5 pts), Bearish (0 pts)
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
 * < 1x: 0 pts
 * 1x – 5x: 2 pts
 * 5x – 15x: 3.5 pts
 * > 15x: 5 pts
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
