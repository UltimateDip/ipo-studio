/**
 * Content & Template Engine Module
 * Generates ready-to-copy assets for YouTube Shorts
 */

/**
 * 1. Voiceover Script with explicit female voice instruction
 */
export function generateVoiceover(companyName, gmpPercent, estLotProfit, starRating) {
  const gmpStr = `${gmpPercent}%`;
  const profitFormatted = Number(estLotProfit).toLocaleString('en-IN');
  return `[Voice: Energetic, confident Female voice with crisp Indian English accent]:
"${companyName} IPO metrics breakdown! Grey Market Premium is at ${gmpStr}, pointing to an estimated lot gain of ₹${profitFormatted}. Our data model rates this IPO ${starRating} out of 10 stars."`;
}

/**
 * Helper to count words in the spoken script only
 */
export function countWords(text) {
  if (!text) return 0;
  // Strip speaker instructions in brackets if present
  const cleaned = text.replace(/\[.*?\]:?/g, '').replace(/["']/g, '');
  return cleaned.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * 2. Visual Prompt (9:16 Vertical)
 */
export function generateVisualPrompt(companyName, gmpPercent, estLotProfit, starRating, qibSub, niiSub) {
  const profitFormatted = Number(estLotProfit).toLocaleString('en-IN');
  const qibText = qibSub ? `QIB: ${qibSub}x` : 'QIB Live';
  const niiText = niiSub ? `NII: ${niiSub}x` : 'NII Live';

  return `High-energy 10-second vertical 9:16 financial graphic render, sleek dark glassmorphism aesthetic with deep navy and obsidian background, glowing electric cyan and emerald green volumetric lighting, smooth camera dolly forward motion. Centered floating 3D glass HUD card with ultra-sharp glowing typography displaying: "${companyName} IPO", "GMP: ${gmpPercent}%", "Est Lot Gain: ₹${profitFormatted}", secondary metric badges "${qibText} | ${niiText}", and a prominent animated badge showing "${starRating} / 10 STARS". Crisp 4K resolution, cinematic trading terminal VFX, subtle motion blur, floating particle physics, professional studio grade. Bottom subtle fixed text badge: "Educational Purpose Only | Data Analysis".`;
}

/**
 * 3. UNIFIED Master AI Video & Voice Prompt (Single-Prompt Generation)
 * Combines explicit female audio instruction, spoken script, and 9:16 visual scene into one copyable block.
 */
export function generateUnifiedPrompt(companyName, gmpPercent, estLotProfit, starRating, qibSub, niiSub, overallSub, biddingDay) {
  const profitFormatted = Number(estLotProfit).toLocaleString('en-IN');

  const qibVal = qibSub ? parseFloat(qibSub).toFixed(2) : '0.00';
  const niiVal = niiSub ? parseFloat(niiSub).toFixed(2) : '0.00';
  const overallVal = overallSub ? parseFloat(overallSub).toFixed(2) : '0.00';
  const dayText = biddingDay ? `Day ${biddingDay}` : 'Day 1';

  const scriptText = `"${companyName} IPO breakdown! Grey Market Premium is at ${gmpPercent}% with ₹${profitFormatted} lot gain. Our data model rates it ${starRating} out of 10 stars."`;
  const wordCount = countWords(scriptText);

  return `🎥 10-Second YouTube Short Script
🗣️ Voiceover Script (Female Voice, Global/Indian English Accent - ${wordCount} Words)
${scriptText}

🎬 Continuous Visual Prompt (Text-to-Video AI)
A continuous, high-energy 10-second vertical 9:16 financial graphic render with volumetric lighting and depth-of-field blur. The camera rapidly dollies forward over a futuristic dark glass trading terminal. In fast sequence, high-contrast glowing neon text overlays appear locked to camera motion:

Top Primary Header: '${companyName.toUpperCase()} IPO' (With smaller background sub-text: '${dayText} | Overall Sub: ${overallVal}x')

Center Main Feature: Massive glowing text reading 'GMP: ${gmpPercent}%' alongside a bold green badge: 'EST. LOT PROFIT: ₹${profitFormatted}'

Secondary Floating HUD (Right Corner): Small secondary readouts displaying 'QIB: ${qibVal}x | NII: ${niiVal}x'

Center Final: A glowing high-contrast digital status badge materializes center-screen displaying bold metallic text: 'SCORE: ${starRating} / 10' with a glowing green accent border. The clip ends on a subtle bottom text badge reading: 'Educational Purpose Only | Data Analysis'.`;
}

/**
 * 4. YouTube Shorts Title
 */
export function generateYTTitle(companyName) {
  return `${companyName} IPO Data Breakdown | Estimated Profit & Rating 🚀 #IPO`;
}

/**
 * 5. YouTube Shorts Description
 */
export function generateYTDescription(companyName, biddingDay, estLotProfit, gmpPercent, gmpValueCalculated, starRating) {
  const profitFormatted = Number(estLotProfit).toLocaleString('en-IN');
  const dayText = biddingDay ? `Day ${biddingDay}` : 'Day 1';
  
  return `Quick 10-second data breakdown for ${companyName} IPO (${dayText}):

💰 Expected Gain: ₹${profitFormatted} / Lot
📈 GMP: ${gmpPercent}% (₹${gmpValueCalculated}/share)
⭐ Data Model Rating: ${starRating} / 10 Stars

Educational purpose only. Perform your own research before making investment decisions.`;
}

/**
 * 6. YouTube Shorts Hashtags
 */
export function generateYTHashtags(hashtagName) {
  const tag = hashtagName || 'IPO';
  return `${tag}IPO, IPONews, StockMarketIndia, ShareMarket, Shorts, Finance`;
}