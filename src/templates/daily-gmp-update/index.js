import { formatINR } from '../common.js';
import { evaluateIPO } from './scorer.js';

export { evaluateIPO };

/**
 * 3. Unified Master AI Video & Voice Prompt (Daily GMP Update)
 */
export function generateUnifiedPrompt(companyName, gmpPercent, estLotProfit, starRating, qibSub, niiSub, overallSub, biddingDay) {
  const comp = companyName || 'Company';
  const profitFormatted = formatINR(estLotProfit);

  const qibVal = qibSub ? parseFloat(qibSub).toFixed(2) : '0.00';
  const niiVal = niiSub ? parseFloat(niiSub).toFixed(2) : '0.00';
  const overallVal = overallSub ? parseFloat(overallSub).toFixed(2) : '0.00';
  const dayText = biddingDay ? `Day ${biddingDay}` : 'Day 1';

  return `Generate a 10-second vertical 9:16 high-retention financial data video synchronized with an energetic female voiceover.

[AUDIO / VOICEOVER SCRIPT]:
(Voice: Confident, energetic female voice with a clear, punchy Indian/Global English accent | Strictly 16–19 words, ~9.5s duration)
"${comp} IPO breakdown! GMP sits at ${gmpPercent}%, estimating ${profitFormatted} rupees profit. Data model rates it ${starRating} stars."

[VISUAL & CINEMATOGRAPHY SPECIFICATION]:
- Format: 9:16 vertical aspect ratio, ultra-crisp 4K motion graphics.
- Aesthetic & Lighting: Dark Glass Fintech Terminal aesthetic with deep obsidian glass panels, vibrant neon emerald green volumetric lighting, and subtle floating digital particle dust.
- Camera Motion: Continuous, smooth camera dolly forward motion creating constant visual momentum.
- Framing Anchors:
  * Top: Fixed glowing neon series badge '[IPO IN 10]' with small subtext '${dayText} | Total Sub: ${overallVal}x'.
  * Center: Solid, high-contrast static 3D cards snapping cleanly into focus (no rapid scrolling text). Primary card displays bold metallic text 'EST. LOT PROFIT: ₹${profitFormatted}' with a solid glowing secondary chip '${gmpPercent}% GMP'.
  * Bottom: Metallic status badge reading 'DATA SCORE: ${starRating} / 10 STARS' locked directly above the fixed channel watermark "10 SECONDS. ONE MONEY LESSON." with small subtext "Educational Purpose Only | Data Analysis".

[SYNCHRONIZED 3-ACT TIMELINE]:
- 0–2s (The Hook): Camera glides forward over dark obsidian glass as the solid neon top header emerges: '${comp.toUpperCase()} IPO' with pulsing subtext '${dayText}'.
- 2–7s (The Single Profit Metric): Center display cleanly snaps into a bold, static 3D emerald glass card: 'EST. LOT PROFIT: ₹${profitFormatted}' with a solid glowing secondary pill badge: '${gmpPercent}% GMP'. Secondary HUD indicator reads: 'QIB: ${qibVal}x | NII: ${niiVal}x'.
- 7–10s (The Neutral Payoff): A polished metallic status badge expands center-screen reading 'DATA SCORE: ${starRating} / 10 STARS' directly above the fixed channel watermark "10 SECONDS. ONE MONEY LESSON." (Subtext: Educational Purpose Only).`;
}

/**
 * 4. YouTube Shorts Title (Daily GMP Update)
 */
export function generateYTTitle(companyName, biddingDay) {
  const comp = companyName || 'Company';
  const dayNum = parseInt(biddingDay, 10);
  
  if (dayNum === 1) {
    return `${comp} IPO Breakdown (Day 1) #Shorts`;
  } else if (dayNum === 2) {
    return `${comp} IPO: Day 2 Demand & Review #Shorts`;
  } else if (dayNum === 3) {
    return `${comp} IPO: Final Day Demand & Score #Shorts`;
  }
  return `${comp} IPO Data Breakdown #Shorts`;
}

/**
 * 5. YouTube Shorts Description (Daily GMP Update)
 */
export function generateYTDescription(companyName, biddingDay, estLotProfit, gmpPercent, gmpValueCalculated, starRating, overallSub, qibSub, niiSub) {
  const comp = companyName || 'Company';
  const profitFormatted = formatINR(estLotProfit);
  const dayText = biddingDay ? (parseInt(biddingDay, 10) === 3 ? 'Day 3 / Final' : `Day ${biddingDay}`) : 'Day 1';
  const overallVal = overallSub ? parseFloat(overallSub).toFixed(2) : '0.00';
  const qibVal = qibSub ? parseFloat(qibSub).toFixed(2) : '0.00';
  const niiVal = niiSub ? parseFloat(niiSub).toFixed(2) : '0.00';
  const gmpVal = gmpValueCalculated !== undefined && gmpValueCalculated !== null ? gmpValueCalculated : '0';
  
  return `10-second quantitative data breakdown for ${comp} IPO (${dayText}):

• Estimated Lot Profit: ₹${profitFormatted}
• Grey Market Premium (GMP): ${gmpPercent}% (₹${gmpVal}/share)
• Total Subscription: ${overallVal}x (QIB: ${qibVal}x | NII: ${niiVal}x)
• Data Model Rating: ${starRating} / 10 Stars

10 SECONDS. ONE MONEY LESSON.

Disclaimer: For educational and informational purposes only. Not financial advice. Always perform your own due diligence before investing.`;
}

/**
 * 6. YouTube Shorts Tags (Daily GMP Update)
 */
export function generateYTHashtags(companyName) {
  const comp = companyName || 'Company';
  return `Shorts, ${comp} IPO, ${comp} GMP, ${comp} IPO Review, IPO GMP Today, IPO Subscription Status, Stock Market India, IPO News, Share Market`;
}
