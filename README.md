# 🚀 Shagun Tyagi — Professional Portfolio (V2)

A premium, modern, and interactive developer portfolio showcasing AI/ML and engineering expertise. Built using React, Vite, Framer Motion, and Tailwind-inspired custom CSS themes, with full Firebase integration and a built-in Google Gemini AI chatbot assistant.

---

## ✨ Features

- **🤖 AI Chatbot Assistant:** Powered by Google Gemini (AI Studio free tier) to answer technical queries and experience-related questions based on a structured portfolio knowledge base.
- **✍️ Admin Blog Platform:** Secure blog publishing workspace protected by Firebase Authentication and custom Firestore security rules.
- **📬 Interactive Integrations:** Real-time Contact Form and Newsletter subscription stored instantly in Firebase Firestore.
- **🔔 Web Push Notifications:** Integrates Firebase Cloud Messaging (FCM) to request permissions and push alerts to subscribers.
- **✨ Creative UI/UX:** Responsive page transitions, custom cursors, smooth interactive lists, table of contents, reading-progress indicators, and smooth momentum scrolling (Lenis).

---

## 🛠️ Tech Stack

- **Frontend Core:** React 19, Vite, React Router 7
- **Styling:** Vanilla CSS Custom Variables (Harmonious Dark/Light themes)
- **Database / Backend:** Firebase (Firestore, Auth, Cloud Functions)
- **AI Engine:** Google Gemini (Generative Language API)
- **Animations:** Framer Motion, Motion, Lucide icons

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Theshaguntyagi/PORTFOLIO-V2.git
cd PORTFOLIO-V2
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory and configure the following parameters:

```env
# Google Gemini API
VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY
VITE_GEMINI_MODEL=gemini-2.5-flash

# Firebase Web App Configuration
VITE_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_PROJECT.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT
VITE_FIREBASE_STORAGE_BUCKET=YOUR_PROJECT.firebasestorage.app
VITE_FIREBASE_SENDER_ID=YOUR_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
VITE_FIREBASE_MEASUREMENT_ID=YOUR_MEASUREMENT_ID

# Optional: Web Push Key & Calendly
VITE_FIREBASE_VAPID_KEY=YOUR_VAPID_PUBLIC_KEY
VITE_CALENDLY_URL=YOUR_CALENDLY_LINK
```

### 4. Run Locally
```bash
npm run dev
```
Open [http://localhost:5173/PORTFOLIO-V2/](http://localhost:5173/PORTFOLIO-V2/) in your browser.

---

## ☁️ Firebase Deploy (Cloud Functions & Firestore)

This repository includes a backend Cloud Function to proxy requests securely to the Gemini API (protecting your API keys).

1. Log into your Firebase account:
   ```bash
   npm install -g firebase-tools
   firebase login
   ```
2. Initialize and select your project:
   ```bash
   firebase use --add
   ```
3. Set your Gemini API key as a secure secret in Cloud Functions:
   ```bash
   firebase functions:secrets:set GEMINI_API_KEY
   ```
4. Install function dependencies and deploy:
   ```bash
   cd functions && npm install && cd ..
   firebase deploy --only functions,firestore:rules
   ```

---

## 📦 Building & Deploying to GitHub Pages

The project utilizes the `gh-pages` build-and-deploy workflow.

To compile production bundles and push them directly to your repository's pages branch, run:
```bash
npm run deploy
```

---

## 🤝 Contact
- **Developer:** Shagun Tyagi
- **Email:** theshaguntyagi@gmail.com
- **LinkedIn:** [linkedin.com/in/theshaguntyagi](https://linkedin.com/in/theshaguntyagi)
