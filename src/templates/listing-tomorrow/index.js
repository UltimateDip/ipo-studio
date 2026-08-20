import { formatINR } from '../common.js';

const LISTING_TIME = '10:00 AM';
const EXCHANGES = 'BSE & NSE';

/**
 * 1. Unified Master AI Video & Voice Prompt (Listing Tomorrow)
 */
export function generateListingTomorrowUnifiedPrompt(
  companyName,
  gmpPercent,
  estLotProfit
) {
  const comp = companyName || 'Company';
  const compUpper = comp.toUpperCase();
  const gainPercent = gmpPercent !== undefined && gmpPercent !== null && gmpPercent !== '' ? gmpPercent : '0';
  const numericProfit = Math.round(Number(estLotProfit) || 0);
  const profitFormatted = formatINR(numericProfit);

  const spokenScript = `"${comp} IPO lists tomorrow! ${gainPercent}% premium projects ${profitFormatted} rupees profit. Track tomorrow at ten AM."`;

  return `Generate a 10-second vertical 9:16 high-retention financial data video synchronized with an energetic female voiceover.

[AUDIO / VOICEOVER SCRIPT]:
(Voice: Confident, energetic female voice with a clear, punchy Indian/Global English accent | Strictly 18–19 words, ~9.5s duration)
${spokenScript}

[VISUAL & CINEMATOGRAPHY SPECIFICATION]:
- Format: 9:16 vertical aspect ratio, ultra-crisp 4K motion graphics.
- Aesthetic & Lighting: Dark Glass Fintech Terminal aesthetic with deep obsidian glass panels, vibrant neon emerald green volumetric lighting, and subtle floating digital particle dust.
- Camera Motion: Continuous, smooth camera dolly forward motion creating constant visual momentum.
- Framing Anchors:
  * Top: Fixed glowing neon series badge '[IPO IN 10]' with small subtext 'Listing Tomorrow | ${EXCHANGES}'.
  * Center: Solid, high-contrast static 3D cards snapping cleanly into focus (no rapid scrolling text). Primary card displays bold metallic text 'EST. LOT PROFIT: ₹${profitFormatted}' with a solid glowing secondary chip '${gainPercent}% PREMIUM'.
  * Bottom: Metallic status badge reading 'LISTING TIME: ${LISTING_TIME}' locked directly above the fixed channel watermark "10 SECONDS. ONE MONEY LESSON." with small subtext "Educational Purpose Only | Data Analysis".

[SYNCHRONIZED 3-ACT TIMELINE]:
- 0–2s (The Listing Hook): Camera glides forward over dark obsidian glass as the solid neon top header emerges: '${compUpper} IPO LISTS TOMORROW' with a pulsing golden exchange icon.
- 2–7s (The Single Profit Metric): Center display cleanly snaps into a bold, static 3D emerald glass card: 'EST. LOT PROFIT: ₹${profitFormatted}' with a solid glowing secondary pill badge: '${gainPercent}% PREMIUM'.
- 7–10s (The Neutral Payoff): The display locks into a polished metallic card reading 'LISTING TIME: ${LISTING_TIME}' directly above the fixed channel watermark "10 SECONDS. ONE MONEY LESSON." (Subtext: Educational Purpose Only).`;
}

/**
 * 2. YouTube Shorts Title (Listing Tomorrow)
 */
export function generateListingTomorrowYTTitle(companyName) {
  const comp = companyName || 'Company';
  return `${comp} IPO Lists Tomorrow: Pre-Listing Data #Shorts`;
}

/**
 * 3. YouTube Shorts Description (Listing Tomorrow)
 */
export function generateListingTomorrowYTDescription(
  companyName,
  gmpPercent,
  estLotProfit
) {
  const comp = companyName || 'Company';
  const profitFormatted = formatINR(estLotProfit || 0);
  const gainPercent = gmpPercent !== undefined && gmpPercent !== null && gmpPercent !== '' ? gmpPercent : '0';

  return `10-second quantitative data breakdown for ${comp} IPO listing tomorrow:

• Estimated Lot Profit: ₹${profitFormatted}
• Latest Grey Market Premium (GMP): ${gainPercent}%
• Listing Time: ${LISTING_TIME} (${EXCHANGES})

10 SECONDS. ONE MONEY LESSON.

Disclaimer: For educational and informational purposes only. Not financial advice. Data based on prevailing grey market indicators.`;
}

/**
 * 4. YouTube Shorts Tags (Listing Tomorrow)
 */
export function generateListingTomorrowYTHashtags(companyName) {
  const comp = companyName || 'Company';
  return `Shorts, ${comp} IPO, ${comp} Listing Date, ${comp} Expected Listing Price, ${comp} GMP, Stock Market India, IPO News, Share Market`;
}
