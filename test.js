import { evaluateIPO } from './src/scorer.js';
import {
  generateVoiceover,
  generateVisualPrompt,
  generateUnifiedPrompt,
  generateYTTitle,
  generateYTDescription,
  generateYTHashtags,
  countWords
} from './src/templates.js';

const testCases = [
  {
    name: 'Molbio Diagnostics Limited',
    price: 807,
    lotSize: 18,
    gmpPercent: 32,
    day: 3,
    qib: 14.5,
    nii: 8.2,
    overall: 17.37,
    vix: 14.2,
    nifty5d: 0.8,
    adRatio: 1.3
  }
];

console.log('=== VERIFYING UNIFIED PROMPT & FEMALE VO INSTRUCTION ===\n');

for (const t of testCases) {
  const res = evaluateIPO({
    companyName: t.name,
    highPrice: t.price,
    lotSize: t.lotSize,
    gmpPercent: t.gmpPercent,
    biddingDay: t.day,
    qibSub: t.qib,
    niiSub: t.nii,
    overallSub: t.overall,
    vix: t.vix,
    nifty5d: t.nifty5d,
    adRatio: t.adRatio
  });

  const unified = generateUnifiedPrompt(res.cleanedName, t.gmpPercent, res.estLotProfit, res.starRating, t.qib, t.nii, t.overall, t.day);
  const vo = generateVoiceover(res.cleanedName, t.gmpPercent, res.estLotProfit, res.starRating);

  console.log('[1] SEPARATE VO SCRIPT:');
  console.log(vo);
  console.log('\n[2] UNIFIED MASTER SINGLE PROMPT (1-CLICK COPY):');
  console.log(unified);
  console.log('\n[3] YOUTUBE TITLE:');
  console.log(generateYTTitle(res.cleanedName));
  console.log('\n[4] YOUTUBE DESCRIPTION:');
  console.log(generateYTDescription(res.cleanedName, t.day, res.estLotProfit, t.gmpPercent, res.gmpValueCalculated, res.starRating));
}

console.log('ALL CHECKS PASSED!');
