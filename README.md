# Arav Mendiratta — Developer Portfolio Website

[![GitHub Pages Deployment](https://img.shields.io/badge/Deploy-GitHub_Pages-10b981?style=for-the-badge&logo=github)](https://aravmendiratta.github.io/Portfolio/)
[![Tech Stack](https://img.shields.io/badge/Tech-HTML5_|_CSS3_|_JavaScript-06b6d4?style=for-the-badge)](https://developer.mozilla.org/)

An interactive, high-performance developer portfolio showcasing my work in Machine Learning, Distributed Streaming Systems, and Computational Biology.

---

## ⚡ Key Highlights
- **Zero-Build Architecture:** Pure Semantic HTML5, Vanilla CSS3 (Custom Design System with Glassmorphism), and Vanilla ES6+ JavaScript.
- **Instant GitHub Pages Ready:** Includes `.nojekyll` and static routing.
- **Interactive Project Deep Dives:** Modal architectural breakdowns for all 7 engineering platforms.
- **Developer CLI Terminal:** An interactive shell allowing recruiters to type commands (`help`, `projects`, `skills`, `research`, `thesis`, `contact`, `theme`, `clear`).
- **Cybernetic Theme System:** Sleek Dark Mode (Default) + High-Contrast Light Mode with local storage persistence.
- **Responsive:** Mobile-first layout with smooth micro-animations and background particle constellation canvas.

---

## 🚀 How to Run Locally

No dependencies or node_modules required! Simply serve the directory using any static file server:

### Option 1: Python
```bash
python -m http.server 8000
```
Then visit [http://localhost:8000](http://localhost:8000).

### Option 2: VS Code Live Server
Right-click `index.html` and click **"Open with Live Server"**.

---

## 🌐 Deploy to GitHub Pages in 2 Minutes

1. Initialize git and commit your files:
   ```bash
   git init
   git add .
   git commit -m "feat: initial release of personal portfolio"
   ```
2. Create a new repository on GitHub named `Portfolio` (or `aravmendiratta.github.io`).
3. Link your remote and push:
   ```bash
   git remote add origin https://github.com/aravmendiratta/Portfolio.git
   git branch -M main
   git push -u origin main
   ```
4. On GitHub, navigate to **Settings** > **Pages**:
   - Source: **Deploy from a branch**
   - Branch: **main** / root `/`
   - Click **Save**.
5. Your live portfolio will be live at `https://aravmendiratta.github.io/Portfolio/`!

---

## 📂 Project Structure
```text
Portfolio/
├── .nojekyll                 # Bypasses Jekyll on GitHub Pages
├── index.html                # Semantic, SEO-optimized markup
├── styles.css                # Glassmorphic design system, CSS variables & animations
├── app.js                    # Dynamic project rendering, modal, CLI terminal, counters
├── assets/
│   ├── avatar.jpg            # Geometric neural emblem / avatar
│   └── Arav_Mendiratta_Resume.pdf  # Downloadable PDF CV
├── PROFILE_README.md         # Profile README for github.com/aravmendiratta
└── README.md                 # Project documentation & setup instructions
```

---

© 2026 Arav Mendiratta • Düsseldorf / Freiburg, Germany
