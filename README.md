# 🚀 IPO Shorts Studio

A cross-platform Progressive Web App (PWA) that automates your entire YouTube Shorts IPO content creation pipeline. 
Runs seamlessly on **Mac (Desktop browser)** and **Android (1-Tap Home Screen PWA)**.

---

## ✨ What It Does

1. **📊 100-Point Quantitative Scoring Engine**: Auto-calculates a 10-star rating algorithm:
   - GMP / Projected Listing Gain (0–35 pts)
   - QIB Bidding (normalized by Day 1 / 2 / 3, 0–35 pts)
   - NII / HNI Subscription (0–15 pts)
   - Broader Market Mood (Bullish / Neutral / Bearish) (0–10 pts)
   - Overall Subscription (0–5 pts)
2. **🎬 Unified AI Video + Voiceover Prompt**: Generates a single, ready-to-copy block with instructions for a 9:16 vertical AI visual and a synchronized female retail voiceover.
3. **📌 YouTube Shorts Metadata**: Generates the exact formatted title, description (with lot gains and star rating), and comma-separated hashtags.
4. **⚡ 1-Tap Copy Buttons**: Individual copy buttons with visual checkmark feedback + offline caching.

---

## 📱 How to Use on Android (Install as App)

1. Deploy to **GitHub Pages** (see instructions below) or run on local Wi-Fi.
2. Open the URL in **Google Chrome** on your Android phone.
3. Tap the **"Install"** banner at the top, or tap Chrome Menu (`⋮`) → **"Add to Home screen"** / **"Install app"**.
4. It will now launch as a standalone app without browser bars and work even offline!

---

## 🌐 Deploy to GitHub Pages (Free & Instant)

To host this online for free so you can access it on your Android phone and Mac from anywhere:

1. Create a new repository on GitHub (e.g. `ipo-studio`).
2. Push this folder to your repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - IPO Shorts Studio"
   git branch -M main
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/ipo-studio.git
   git push -u origin main
   ```
3. On GitHub, go to your repository **Settings** → **Pages**.
4. Under **Branch**, select `main` and root `/` folder, then click **Save**.
5. Your live app will be published at: `https://<YOUR_GITHUB_USERNAME>.github.io/ipo-studio/`

---

## 💻 Local Usage on Mac

To run locally on your Mac:
```bash
# Start a simple local server
npx serve .
# or
python3 -m http.server 8080
```
Open `http://localhost:8080` in your browser.

---

## 🧮 Algorithm Reference

| Metric | Max Points |
|---|---|
| **Grey Market Premium (GMP %)** | 35 pts |
| **QIB Subscription (Normalized by Day)** | 35 pts |
| **NII / HNI Subscription** | 15 pts |
| **Broader Market Mood (Bullish/Neutral/Bearish)** | 10 pts |
| **Overall Subscription** | 5 pts |
| **Total** | **100 pts** |

$$\text{Rating (out of 10)} = \text{ROUND}\left(\frac{\text{Total Points}}{10}, 1\right)$$
