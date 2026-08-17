import { countWords } from '../common.js';

/**
 * 1. Unified Master AI Video & Voice Prompt (Allotment Status Live)
 */
export function generateAllotmentUnifiedPrompt(companyName, registrar) {
  const comp = companyName || 'Company';
  const reg = registrar || 'Registrar';

  return `Generate a 10-second vertical 9:16 high-retention financial alert video synchronized with an energetic female voiceover.

[AUDIO / VOICEOVER SCRIPT]:
(Voice: Confident, energetic female voice with a clear, punchy Indian/Global English accent | Strictly 22 words, ~9.5s duration)
"${comp} IPO allotment is officially live! Check your application status right now on the ${reg} portal. Best of luck on listing gains!"

[VISUAL & CINEMATOGRAPHY SPECIFICATION]:
- Format: 9:16 vertical aspect ratio, ultra-crisp 4K motion graphics.
- Aesthetic & Lighting: Cyber Amber Alert theme with deep midnight obsidian glass, high-voltage electric amber and radiant gold volumetric lighting, and subtle floating golden particle sparks.
- Camera Motion: Fast, continuous smooth camera dolly forward motion creating urgency.
- Framing Anchors:
  * Top: Clean, glowing electric amber header reading '${comp.toUpperCase()} IPO'.
  * Center: Pulsing 3D metallic amber status card with dynamic glowing verification checkmark.
  * Bottom: Fixed metallic status bar and channel watermark "10 SECONDS. ONE MONEY LESSON." with subtext "Educational Purpose Only | Allotment Alert".

[SYNCHRONIZED 3-ACT TIMELINE]:
- 0–3.5s (The Alert Hook): Camera rapidly glides forward as radiant amber shockwave rings expand outward from a glowing badge reading 'ALLOTMENT OUT NOW'.
- 3.5–7.0s (The Verification): Camera dollies deeper into central focus as a polished dark glass application card emerges center-screen displaying a bright neon emerald checkmark and bold text 'STATUS: LIVE'.
- 7.0–10.0s (The Portal CTA): The status card transitions into a high-contrast metallic gold action badge reading 'CHECK ON ${reg.toUpperCase()}' with a subtle downward arrow, locked above the channel watermark "10 SECONDS. ONE MONEY LESSON." (Subtext: Educational Purpose Only).`;
}

/**
 * 2. YouTube Shorts Title (Allotment Status Live)
 */
export function generateAllotmentYTTitle(companyName) {
  const comp = companyName || 'Company';
  return `${comp} IPO Allotment Out Now! Check Status #Shorts`;
}

/**
 * 3. YouTube Shorts Description (Allotment Status Live)
 */
export function generateAllotmentYTDescription(companyName, registrar) {
  const comp = companyName || 'Company';
  const reg = registrar || 'the official registrar';

  return `${comp} IPO allotment is officially live. Check your application status right now on ${reg}.

10 SECONDS. ONE MONEY LESSON.

Disclaimer: For educational and informational purposes only. Not financial advice.`;
}

/**
 * 4. YouTube Shorts Tags (Allotment Status Live)
 */
export function generateAllotmentYTHashtags(companyName, registrar) {
  const comp = companyName || 'Company';
  const reg = registrar || 'Registrar';

  // Include popular known alternate names if recognized, or use entered registrar
  const regLower = reg.toLowerCase();
  let regVariants = [reg];
  if (regLower.includes('kfin')) {
    regVariants = ['KFintech', 'KFin Technologies'];
  } else if (regLower.includes('link') || regLower.includes('intime')) {
    regVariants = ['Link Intime', 'Link Intime India'];
  } else if (regLower.includes('bigshare')) {
    regVariants = ['Bigshare', 'Bigshare Services'];
  } else if (regLower.includes('skyline')) {
    regVariants = ['Skyline', 'Skyline Financial'];
  }

  const regTagsStr = Array.from(new Set(regVariants)).join(', ');

  return `Shorts, ${comp} IPO, ${comp} Allotment, IPO Allotment Status, ${regTagsStr}, IPO Allotment Out, Stock Market India, IPO News`;
}
