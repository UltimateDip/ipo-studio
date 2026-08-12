import { evaluateIPO, cleanCompanyName } from './scorer.js';
import {
  generateUnifiedPrompt,
  generateYTTitle,
  generateYTDescription,
  generateYTHashtags
} from './templates.js';

// DOM Elements
const form = document.getElementById('ipoForm');
const companyNameInput = document.getElementById('companyName');
const highPriceInput = document.getElementById('highPrice');
const lotSizeInput = document.getElementById('lotSize');
const gmpPercentInput = document.getElementById('gmpPercent');
const gmpValueInput = document.getElementById('gmpValue');
const biddingDayInput = document.getElementById('biddingDay');
const qibSubInput = document.getElementById('qibSub');
const niiSubInput = document.getElementById('niiSub');
const overallSubInput = document.getElementById('overallSub');
const marketMoodInput = document.getElementById('marketMood');

// Results DOM
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

// Asset Boxes
const unifiedBox = document.getElementById('unifiedBox');
const ytTitleBox = document.getElementById('ytTitleBox');
const ytDescBox = document.getElementById('ytDescBox');
const ytTagsBox = document.getElementById('ytTagsBox');



/**
 * Get current form values
 */
function getFormData() {
  return {
    companyName: companyNameInput.value.trim() || 'XYZ Company',
    highPrice: parseFloat(highPriceInput.value) || 0,
    lotSize: parseInt(lotSizeInput.value) || 0,
    gmpPercent: parseFloat(gmpPercentInput.value) || 0,
    gmpValue: parseFloat(gmpValueInput.value) || 0,
    biddingDay: parseInt(biddingDayInput.value) || 3,
    qibSub: parseFloat(qibSubInput.value) || 0,
    niiSub: parseFloat(niiSubInput.value) || 0,
    overallSub: parseFloat(overallSubInput.value) || 0,
    marketMood: marketMoodInput.value
  };
}

/**
 * Sync GMP% and GMP ₹ Value
 */
function syncGmpValue(fromPercent = true) {
  const price = parseFloat(highPriceInput.value) || 0;
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
 * Run scoring and update the entire UI
 */
function updateAll() {
  const data = getFormData();
  const evalResult = evaluateIPO(data);

  // Update Hero Card
  companyDisplay.textContent = evalResult.cleanedName || 'Company Name';
  companySubText.textContent = `${data.highPrice ? `₹${data.highPrice} / share` : ''} • Lot: ${data.lotSize || 0} • Day ${data.biddingDay}`;
  scoreNumber.textContent = evalResult.starRating;
  demandText.textContent = `${evalResult.demandCategory} (${evalResult.totalPoints}/100 pts)`;

  // Update badge theme class
  ratingBadge.className = `rating-badge-circle ${evalResult.badgeColor}`;

  // Quick stats
  statLotProfit.textContent = `₹${Number(evalResult.estLotProfit).toLocaleString('en-IN')}`;
  statGmp.textContent = `${data.gmpPercent}%`;
  statSub.textContent = `${data.overallSub || '0'}x`;

  // Point Pills
  pillGmp.innerHTML = `GMP: <strong>${evalResult.gmpPts}</strong>/35`;
  pillQib.innerHTML = `QIB: <strong>${evalResult.qibPts}</strong>/35`;
  pillNii.innerHTML = `NII: <strong>${evalResult.niiPts}</strong>/15`;
  pillMood.innerHTML = `Mood: <strong>${evalResult.moodPts}</strong>/10`;
  pillOverall.innerHTML = `Sub: <strong>${evalResult.overallPts}</strong>/5`;

  // 1. SINGLE UNIFIED PROMPT (VOICE + VISUAL COMBINED)
  if (unifiedBox) {
    unifiedBox.textContent = generateUnifiedPrompt(
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

  if (ytTitleBox) ytTitleBox.textContent = generateYTTitle(evalResult.cleanedName);
  if (ytDescBox) ytDescBox.textContent = generateYTDescription(
    evalResult.cleanedName,
    data.biddingDay,
    evalResult.estLotProfit,
    data.gmpPercent,
    evalResult.gmpValueCalculated,
    evalResult.starRating
  );
  if (ytTagsBox) ytTagsBox.textContent = generateYTHashtags(evalResult.hashtagName);

  // Save to LocalStorage
  try {
    localStorage.setItem('ipo_last_data', JSON.stringify(data));
  } catch (e) {
    // Ignore storage issues
  }
}



/**
 * Copy to Clipboard with Visual Feedback
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

    showToast('Copied to clipboard!');

    setTimeout(() => {
      btnElement.classList.remove('copied');
      btnElement.innerHTML = originalHTML;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy', err);
    showToast('Failed to copy (permission issue)');
  }
};

/**
 * Show Toast Notification
 */
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2400);
}

/**
 * Setup Event Listeners
 */
function setupEventListeners() {
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





  // Clear Form
  document.getElementById('btnClear').addEventListener('click', () => {
    form.reset();
    gmpValueInput.value = '';
    companyNameInput.value = '';
    updateAll();
    showToast('Form cleared');
  });
}

/**
 * Restore last saved data or load default
 */
function initializeData() {
  try {
    const saved = localStorage.getItem('ipo_last_data');
    if (saved) {
      const p = JSON.parse(saved);
      companyNameInput.value = p.companyName || '';
      highPriceInput.value = p.highPrice || '';
      lotSizeInput.value = p.lotSize || '';
      gmpPercentInput.value = p.gmpPercent || '';
      gmpValueInput.value = p.gmpValue || '';
      biddingDayInput.value = p.biddingDay || 3;
      qibSubInput.value = p.qibSub || '';
      niiSubInput.value = p.niiSub || '';
      overallSubInput.value = p.overallSub || '';
      marketMoodInput.value = p.marketMood || 'neutral';
      updateAll();
      return;
    }
  } catch (e) {}

  // Fallback to empty form update
  updateAll();
}

/**
 * Register Service Worker for PWA (Network-first)
 */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js?v=2')
      .then(reg => {
        reg.update();
        console.log('SW updated to v2');
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
