import {
  evaluateIPO,
  generateUnifiedPrompt as generateGMPUnifiedPrompt,
  generateYTTitle as generateGMPYTTitle,
  generateYTDescription as generateGMPYTDescription,
  generateYTHashtags as generateGMPYTHashtags
} from './templates/daily-gmp-update/index.js';

import {
  generateAllotmentUnifiedPrompt,
  generateAllotmentYTTitle,
  generateAllotmentYTDescription,
  generateAllotmentYTHashtags
} from './templates/allotment/index.js';

import {
  generateListingTomorrowUnifiedPrompt,
  generateListingTomorrowYTTitle,
  generateListingTomorrowYTDescription,
  generateListingTomorrowYTHashtags
} from './templates/listing-tomorrow/index.js';

import { cleanCompanyName, formatINR } from './templates/common.js';

// DOM Elements - Mode & Shared
const form = document.getElementById('ipoForm');
const contentModeSelect = document.getElementById('contentMode');
const companyNameInput = document.getElementById('companyName');

// DOM Elements - Shared IPO Fields (used by daily-gmp-update & listing-tomorrow)
const highPriceInput = document.getElementById('highPrice');
const lotSizeInput = document.getElementById('lotSize');
const gmpPercentInput = document.getElementById('gmpPercent');
const gmpValueInput = document.getElementById('gmpValue');

// DOM Elements - Daily GMP Update Only
const biddingDayInput = document.getElementById('biddingDay');
const qibSubInput = document.getElementById('qibSub');
const niiSubInput = document.getElementById('niiSub');
const overallSubInput = document.getElementById('overallSub');
const marketMoodInput = document.getElementById('marketMood');

// DOM Elements - Allotment Status Live
const registrarInput = document.getElementById('registrar');

// Results DOM - Daily GMP Update Hero
const scoreHeroCard = document.getElementById('scoreHeroCard');
const companyDisplay = document.getElementById('companyDisplay');
const companySubText = document.getElementById('companySubText');
const ratingBadge = document.getElementById('ratingBadge');
const scoreNumber = document.getElementById('scoreNumber');
const demandText = document.getElementById('demandText');
const statLotProfit = document.getElementById('statLotProfit');
const statGmp = document.getElementById('statGmp');
const statSub = document.getElementById('statSub');
const pillGmp = document.getElementById('pillGmp');
const pillQib = document.getElementById('pillQib');
const pillNii = document.getElementById('pillNii');
const pillMood = document.getElementById('pillMood');
const pillOverall = document.getElementById('pillOverall');

// Results DOM - Allotment Hero
const allotmentHeroCard = document.getElementById('allotmentHeroCard');
const allotmentCompanyDisplay = document.getElementById('allotmentCompanyDisplay');
const allotmentRegBadge = document.getElementById('allotmentRegBadge');

// Results DOM - Listing Tomorrow Hero
const listingHeroCard = document.getElementById('listingHeroCard');
const listingCompanyDisplay = document.getElementById('listingCompanyDisplay');
const listingCompanySub = document.getElementById('listingCompanySub');
const listingTimeBadge = document.getElementById('listingTimeBadge');

// Output Asset Boxes
const unifiedBox = document.getElementById('unifiedBox');
const ytTitleBox = document.getElementById('ytTitleBox');
const ytDescBox = document.getElementById('ytDescBox');
const ytTagsBox = document.getElementById('ytTagsBox');

/**
 * Get current form values based on mode
 */
function getFormData() {
  return {
    contentMode: contentModeSelect ? contentModeSelect.value : 'daily-gmp-update',
    companyName: companyNameInput ? companyNameInput.value.trim() : '',
    // Shared IPO fields
    highPrice: parseFloat(highPriceInput ? highPriceInput.value : 0) || 0,
    lotSize: parseInt(lotSizeInput ? lotSizeInput.value : 0) || 0,
    gmpPercent: parseFloat(gmpPercentInput ? gmpPercentInput.value : 0) || 0,
    gmpValue: parseFloat(gmpValueInput ? gmpValueInput.value : 0) || 0,
    // Daily GMP Update only
    biddingDay: parseInt(biddingDayInput ? biddingDayInput.value : 0) || 0,
    qibSub: parseFloat(qibSubInput ? qibSubInput.value : 0) || 0,
    niiSub: parseFloat(niiSubInput ? niiSubInput.value : 0) || 0,
    overallSub: parseFloat(overallSubInput ? overallSubInput.value : 0) || 0,
    marketMood: marketMoodInput ? marketMoodInput.value : '',
    // Allotment fields
    registrar: registrarInput ? registrarInput.value.trim() : ''
  };
}

/**
 * Switch active UI mode.
 * Supports space-separated data-mode attributes so shared sections
 * (e.g. "daily-gmp-update listing-tomorrow") appear for multiple modes.
 */
function setContentMode(mode) {
  if (contentModeSelect) {
    contentModeSelect.value = mode;
  }

  // Toggle field sections (supports space-separated data-mode)
  document.querySelectorAll('.mode-fields').forEach(sec => {
    const modes = (sec.dataset.mode || '').split(/\s+/);
    sec.style.display = modes.includes(mode) ? 'block' : 'none';
  });

  // Toggle hero cards (exact match)
  document.querySelectorAll('.mode-hero').forEach(card => {
    card.style.display = card.dataset.mode === mode ? 'block' : 'none';
  });

  updateAll();
}

/**
 * Sync GMP% and GMP ₹ Value
 */
function syncGmpValue(fromPercent = true) {
  const price = parseFloat(highPriceInput ? highPriceInput.value : 0) || 0;
  if (price <= 0) return;

  if (fromPercent) {
    const pct = parseFloat(gmpPercentInput.value);
    if (!isNaN(pct)) {
      const val = (price * (pct / 100)).toFixed(1);
      gmpValueInput.value = val;
    }
  } else {
    const val = parseFloat(gmpValueInput.value);
    if (!isNaN(val)) {
      const pct = ((val / price) * 100).toFixed(1);
      gmpPercentInput.value = pct;
    }
  }
}

/**
 * Run calculations and update UI based on current mode
 */
function updateAll() {
  const data = getFormData();
  const cleanedName = cleanCompanyName(data.companyName);

  if (data.contentMode === 'listing-tomorrow') {
    // -------------------------------------------------------------
    // LISTING TOMORROW MODE (uses shared price/lot/gmp fields)
    // -------------------------------------------------------------
    const price = data.highPrice;
    const lot = data.lotSize;
    const gmpPct = data.gmpPercent;
    const estLotProfit = price > 0 && lot > 0 ? (price * (gmpPct / 100) * lot) : 0;

    if (listingCompanyDisplay) {
      listingCompanyDisplay.textContent = cleanedName || 'Company Name';
    }
    if (listingCompanySub) {
      listingCompanySub.textContent = `Expected Gain: +${gmpPct}% • Est. Lot Profit: ₹${formatINR(estLotProfit)}`;
    }

    if (unifiedBox) {
      unifiedBox.textContent = generateListingTomorrowUnifiedPrompt(
        cleanedName,
        gmpPct,
        estLotProfit
      );
    }
    if (ytTitleBox) {
      ytTitleBox.textContent = generateListingTomorrowYTTitle(cleanedName, gmpPct);
    }
    if (ytDescBox) {
      ytDescBox.textContent = generateListingTomorrowYTDescription(
        cleanedName,
        gmpPct,
        estLotProfit
      );
    }
    if (ytTagsBox) {
      ytTagsBox.textContent = generateListingTomorrowYTHashtags(cleanedName);
    }
  } else if (data.contentMode === 'allotment') {
    // -------------------------------------------------------------
    // ALLOTMENT STATUS LIVE MODE
    // -------------------------------------------------------------
    const reg = data.registrar || 'Registrar Portal';

    if (allotmentCompanyDisplay) {
      allotmentCompanyDisplay.textContent = cleanedName || 'Company Name';
    }
    if (allotmentRegBadge) {
      allotmentRegBadge.textContent = reg;
    }

    if (unifiedBox) {
      unifiedBox.textContent = generateAllotmentUnifiedPrompt(cleanedName, data.registrar);
    }
    if (ytTitleBox) {
      ytTitleBox.textContent = generateAllotmentYTTitle(cleanedName);
    }
    if (ytDescBox) {
      ytDescBox.textContent = generateAllotmentYTDescription(cleanedName, data.registrar);
    }
    if (ytTagsBox) {
      ytTagsBox.textContent = generateAllotmentYTHashtags(cleanedName, data.registrar);
    }
  } else {
    // -------------------------------------------------------------
    // DAILY GMP UPDATE (DAY 1-3) MODE
    // -------------------------------------------------------------
    const evalResult = evaluateIPO(data);

    // Update Score Hero Card
    if (companyDisplay) companyDisplay.textContent = evalResult.cleanedName || 'Company Name';
    if (companySubText) {
      companySubText.textContent = `${data.highPrice ? `₹${data.highPrice} / share` : ''} • Lot: ${data.lotSize || 0} • Day ${data.biddingDay || 1}`;
    }
    if (scoreNumber) scoreNumber.textContent = evalResult.starRating;
    if (demandText) {
      demandText.textContent = `${evalResult.demandCategory} (${evalResult.totalPoints}/100 pts)`;
    }

    // Update badge theme class
    if (ratingBadge) {
      ratingBadge.className = `rating-badge-circle ${evalResult.badgeColor}`;
    }

    // Quick stats
    if (statLotProfit) {
      statLotProfit.textContent = `₹${Number(evalResult.estLotProfit).toLocaleString('en-IN')}`;
    }
    if (statGmp) statGmp.textContent = `${data.gmpPercent}%`;
    if (statSub) statSub.textContent = `${data.overallSub || '0'}x`;

    // Point Pills
    if (pillGmp) pillGmp.innerHTML = `GMP: <strong>${evalResult.gmpPts}</strong>/35`;
    if (pillQib) pillQib.innerHTML = `QIB: <strong>${evalResult.qibPts}</strong>/35`;
    if (pillNii) pillNii.innerHTML = `NII: <strong>${evalResult.niiPts}</strong>/15`;
    if (pillMood) pillMood.innerHTML = `Mood: <strong>${evalResult.moodPts}</strong>/10`;
    if (pillOverall) pillOverall.innerHTML = `Sub: <strong>${evalResult.overallPts}</strong>/5`;

    // Prompt & Metadata Boxes
    if (unifiedBox) {
      unifiedBox.textContent = generateGMPUnifiedPrompt(
        evalResult.cleanedName,
        data.gmpPercent,
        evalResult.estLotProfit,
        evalResult.starRating,
        data.qibSub,
        data.niiSub,
        data.overallSub,
        data.biddingDay
      );
    }

    if (ytTitleBox) ytTitleBox.textContent = generateGMPYTTitle(evalResult.cleanedName, data.biddingDay);
    if (ytDescBox) {
      ytDescBox.textContent = generateGMPYTDescription(
        evalResult.cleanedName,
        data.biddingDay,
        evalResult.estLotProfit,
        data.gmpPercent,
        evalResult.gmpValueCalculated,
        evalResult.starRating,
        data.overallSub,
        data.qibSub,
        data.niiSub
      );
    }
    if (ytTagsBox) ytTagsBox.textContent = generateGMPYTHashtags(evalResult.cleanedName);
  }

  // Save to LocalStorage
  try {
    localStorage.setItem('ipo_last_data', JSON.stringify(data));
  } catch (e) {
    // Ignore storage issues
  }
}

/**
 * Check if the form has missing fields based on mode
 */
function getMissingFields() {
  const data = getFormData();
  const missing = [];
  if (!data.companyName) missing.push('Company Name');

  if (data.contentMode === 'allotment') {
    if (!data.registrar) missing.push('Registrar');
  } else if (data.contentMode === 'listing-tomorrow') {
    if (!data.highPrice) missing.push('Price');
    if (!data.lotSize) missing.push('Lot Size');
    if (!data.gmpPercent) missing.push('GMP %');
  } else {
    if (!data.highPrice) missing.push('Price');
    if (!data.lotSize) missing.push('Lot Size');
    if (!data.gmpPercent && !data.gmpValue) missing.push('GMP');
    if (!data.biddingDay) missing.push('Bidding Day');
    if (!data.marketMood) missing.push('Market Mood');
  }

  return missing;
}

/**
 * Copy to Clipboard with Visual Feedback & Warnings
 */
window.copyContent = async function(elementId, btnElement) {
  const el = document.getElementById(elementId);
  if (!el) return;

  const textToCopy = el.textContent || el.innerText;
  try {
    await navigator.clipboard.writeText(textToCopy);
    
    // Visual button state
    const originalHTML = btnElement.innerHTML;
    btnElement.classList.add('copied');
    btnElement.innerHTML = `<span>✓</span> Copied!`;

    const missing = getMissingFields();
    if (missing.length > 0) {
      showToast(`⚠️ Incomplete: missing ${missing.join(', ')}`, 'warning');
    } else {
      showToast('Copied to clipboard!', 'success');
    }

    setTimeout(() => {
      btnElement.classList.remove('copied');
      btnElement.innerHTML = originalHTML;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy', err);
    showToast('Failed to copy (permission issue)', 'error');
  }
};

let toastTimer = null;

/**
 * Show Toast Notification
 */
function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.className = `toast-container show ${type}`;
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, type === 'warning' ? 3600 : 2400);
}

/**
 * Setup Event Listeners
 */
function setupEventListeners() {
  // Mode Change Event
  if (contentModeSelect) {
    contentModeSelect.addEventListener('change', (e) => {
      setContentMode(e.target.value);
    });
  }

  // Real-time calculation on any input
  const inputs = form.querySelectorAll('input, select');
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      if (input === gmpPercentInput) syncGmpValue(true);
      if (input === gmpValueInput) syncGmpValue(false);
      if (input === highPriceInput) syncGmpValue(true);
      updateAll();
    });
  });

  // Mood toggle buttons
  document.querySelectorAll('.mood-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      marketMoodInput.value = btn.dataset.value;
      updateAll();
    });
  });

  // Clear Form
  const btnClear = document.getElementById('btnClear');
  if (btnClear) {
    btnClear.addEventListener('click', () => {
      form.reset();
      if (gmpValueInput) gmpValueInput.value = '';
      if (companyNameInput) companyNameInput.value = '';
      if (registrarInput) registrarInput.value = '';
      if (marketMoodInput) marketMoodInput.value = '';
      document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active'));
      updateAll();
      showToast('Form cleared');
    });
  }
}

/**
 * Restore last saved data or load default
 */
function initializeData() {
  try {
    const saved = localStorage.getItem('ipo_last_data');
    if (saved) {
      const p = JSON.parse(saved);
      if (p.contentMode && contentModeSelect) {
        contentModeSelect.value = p.contentMode;
      }
      if (companyNameInput) companyNameInput.value = p.companyName || '';
      if (highPriceInput) highPriceInput.value = p.highPrice || '';
      if (lotSizeInput) lotSizeInput.value = p.lotSize || '';
      if (gmpPercentInput) gmpPercentInput.value = p.gmpPercent || '';
      if (gmpValueInput) gmpValueInput.value = p.gmpValue || '';
      if (biddingDayInput) biddingDayInput.value = p.biddingDay || '';
      if (qibSubInput) qibSubInput.value = p.qibSub || '';
      if (niiSubInput) niiSubInput.value = p.niiSub || '';
      if (overallSubInput) overallSubInput.value = p.overallSub || '';
      if (marketMoodInput) marketMoodInput.value = p.marketMood || '';
      if (registrarInput) registrarInput.value = p.registrar || '';

      if (p.marketMood) {
        const activeBtn = document.querySelector(`.mood-btn[data-value="${p.marketMood}"]`);
        if (activeBtn) activeBtn.classList.add('active');
      }

      setContentMode(p.contentMode || 'daily-gmp-update');
      return;
    }
  } catch (e) {}

  // Fallback to default mode update
  setContentMode('daily-gmp-update');
}

/**
 * Register Service Worker for PWA (Network-first)
 */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js?v=3')
      .then(reg => {
        reg.update();
        console.log('SW updated to v3');
      })
      .catch(err => console.log('SW registration failed', err));
  });
}

// PWA Install Prompt handling
let deferredPrompt;
const pwaBanner = document.getElementById('pwaBanner');
const btnInstall = document.getElementById('btnInstall');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (pwaBanner) pwaBanner.classList.add('active');
});

if (btnInstall) {
  btnInstall.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install: ${outcome}`);
    deferredPrompt = null;
    pwaBanner.classList.remove('active');
  });
}

// Init on load
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  initializeData();
});
