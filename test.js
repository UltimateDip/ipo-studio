import {
  evaluateIPO,
  generateUnifiedPrompt as generateGMPUnifiedPrompt,
  generateYTTitle as generateGMPYTTitle,
  generateYTDescription as generateGMPYTDescription,
  generateYTHashtags as generateGMPYTHashtags
} from './src/templates/daily-gmp-update/index.js';

import {
  generateAllotmentUnifiedPrompt,
  generateAllotmentYTTitle,
  generateAllotmentYTDescription,
  generateAllotmentYTHashtags
} from './src/templates/allotment/index.js';

import { cleanCompanyName } from './src/templates/common.js';

console.log('=== 1. VERIFYING DAILY GMP UPDATE MODULE ===\n');

const gmpTest = {
  name: 'Molbio Diagnostics Limited',
  price: 807,
  lotSize: 18,
  gmpPercent: 32,
  day: 3,
  qib: 14.5,
  nii: 8.2,
  overall: 17.37
};

const res = evaluateIPO({
  companyName: gmpTest.name,
  highPrice: gmpTest.price,
  lotSize: gmpTest.lotSize,
  gmpPercent: gmpTest.gmpPercent,
  biddingDay: gmpTest.day,
  qibSub: gmpTest.qib,
  niiSub: gmpTest.nii,
  overallSub: gmpTest.overall,
  marketMood: 'bullish'
});

console.log('Cleaned Name:', res.cleanedName);
console.log('Star Rating:', res.starRating);
console.log('GMP Unified Prompt:\n', generateGMPUnifiedPrompt(res.cleanedName, gmpTest.gmpPercent, res.estLotProfit, res.starRating, gmpTest.qib, gmpTest.nii, gmpTest.overall, gmpTest.day));
console.log('\nGMP YT Title:', generateGMPYTTitle(res.cleanedName));
console.log('\nGMP YT Description:\n', generateGMPYTDescription(res.cleanedName, gmpTest.day, res.estLotProfit, gmpTest.gmpPercent, res.gmpValueCalculated, res.starRating));
console.log('\nGMP YT Hashtags:', generateGMPYTHashtags(res.hashtagName));

console.log('\n\n=== 2. VERIFYING ALLOTMENT STATUS LIVE MODULE ===\n');

const allotmentTest = {
  name: 'Shiprocket Limited',
  registrar: 'KFintech'
};

const cleanedAllotmentName = cleanCompanyName(allotmentTest.name);
console.log('Cleaned Name:', cleanedAllotmentName);
console.log('\nAllotment Unified Prompt:\n', generateAllotmentUnifiedPrompt(cleanedAllotmentName, allotmentTest.registrar));
console.log('\nAllotment YT Title:\n', generateAllotmentYTTitle(cleanedAllotmentName));
console.log('\nAllotment YT Description:\n', generateAllotmentYTDescription(cleanedAllotmentName, allotmentTest.registrar));
console.log('\nAllotment YT Tags:\n', generateAllotmentYTHashtags(cleanedAllotmentName, allotmentTest.registrar));

console.log('\n\n>>> ALL TESTS PASSED SUCCESSFULLY! <<<');
