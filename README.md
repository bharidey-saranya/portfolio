# Bharidey Saranya — Developer Portfolio 🚀

> Modern, responsive, dark-mode personal portfolio engineered for **Bharidey Saranya**, PHP Backend Developer & Database Specialist.

![Backend Architecture](assets/backend_hero.jpg)

## 🌟 Highlights
- **Showcase Experience**: Highlights 2+ years of production experience at **Medicover** (Techpro Enterprise Healthcare Platform) and **Insource Software** (Ashraya & SVS Warehouse Management Systems).
- **Interactive API Playground**: An embedded RESTful API inspector allowing recruiters to test mock backend endpoints (`GET /api/v1/patient-indent`, `POST /api/v1/warehouse/grn`, etc.) with real SQL query breakdowns and JSON payloads.
- **Role-Based Projects**: Featured full-stack **School Management System** (Node.js, Express, MySQL) with link to your GitHub repository.
- **Zero-Dependency Architecture**: Built using pure semantic HTML5, modern CSS3 (glassmorphism & gradients), and modular ES6 JavaScript. Ready for instant GitHub Pages deployment with zero build steps!
- **Interactive Resume Modal**: One-click printable & downloadable resume formatted identically to your official CV.
- **Instant Contact Channels**: Quick-copy email, phone, and direct `mailto` integration.

---

## 🛠️ Tech Stack
- **Structure**: Semantic HTML5 (SEO optimized with OpenGraph metadata)
- **Styling**: Vanilla CSS3, CSS Custom Properties, Glassmorphism, Flexbox & CSS Grid
- **Interactivity**: Vanilla JavaScript (ES6+), Clipboard API, Dynamic typing, Interactive API Playground
- **Typography & Icons**: Google Fonts (Outfit & JetBrains Mono), FontAwesome 6.5.1

---

## 🚀 How to Push to Your GitHub Account

Follow these quick terminal commands to push this portfolio to your GitHub account (`bharidey-saranya`):

### Step 1: Initialize Git and Commit
Open PowerShell or your terminal in this `portfolio` directory:
```bash
cd c:\Users\Medicover\.gemini\antigravity-ide\scratch\portfolio

# Initialize Git
git init

# Stage all portfolio files
git add .

# Create initial commit
git commit -m "Initial commit: Bharidey Saranya Backend Developer Portfolio"
```

### Step 2: Create a New Repository on GitHub
1. Go to **[GitHub: New Repository](https://github.com/new)**.
2. Set the **Repository name** to `portfolio` (or `bharidey-saranya.github.io` for root domain hosting).
3. Choose **Public**.
4. Leave "Add a README file" **unchecked** (we already have one).
5. Click **Create repository**.

### Step 3: Link Remote and Push
Run the following commands:
```bash
# Rename branch to main
git branch -M main

# Add your GitHub repository as remote (replace with your repo URL)
git remote add origin https://github.com/bharidey-saranya/portfolio.git

# Push your code
git push -u origin main
```

---

## 🌐 How to Make it Live on the Web (GitHub Pages - FREE)

Once your code is pushed to GitHub:
1. In your GitHub repository (`github.com/bharidey-saranya/portfolio`), click on the **Settings** tab.
2. In the left sidebar, click **Pages** (under "Code and automation").
3. Under **Build and deployment** > **Branch**:
   - Select `main` from the branch dropdown.
   - Leave the folder as `/ (root)`.
   - Click **Save**.
4. In about 1–2 minutes, GitHub will give you a live public link, like:
   👉 **`https://bharidey-saranya.github.io/portfolio/`**

---

## 💻 Local Preview
To test locally, you can open `index.html` directly in any browser:
```powershell
Start-Process "index.html"
```
Or run a lightweight HTTP server:
```bash
# Using Python
python -m http.server 8080

# Or using npx serve
npx -y serve .
```

---

© 2026 Bharidey Saranya. All rights reserved.
