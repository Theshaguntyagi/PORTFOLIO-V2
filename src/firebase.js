import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getMessaging, isSupported } from "firebase/messaging";

// Config reads from env (.env) first, falling back to the existing values.
// To move this to YOUR OWN Firebase account, set VITE_FIREBASE_* in .env
// (see .env.example) — no code change needed.
// NOTE: public/firebase-messaging-sw.js has its own hardcoded copy of this
// config (service workers can't read import.meta.env) — update it there too.
const env = import.meta.env;

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || "AIzaSyC0IiATCY5LacO2hHLKHpJWNkboxbwMmM4",
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || "web-app-5da25.firebaseapp.com",
  projectId: env.VITE_FIREBASE_PROJECT_ID || "web-app-5da25",
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || "web-app-5da25.firebasestorage.app",
  messagingSenderId: env.VITE_FIREBASE_SENDER_ID || "1764747410",
  appId: env.VITE_FIREBASE_APP_ID || "1:1764747410:web:2437e705c16c81a7e01e4b",
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID || "G-FWLZR29XHY",
};

export const VAPID_KEY =
  env.VITE_FIREBASE_VAPID_KEY ||
  "BKwwk4MY3pZ7pj6k3SDCW3xU1Oraaa02T-1e56rMVQXQ8G9JNgicG4sdTn_Q2Hsng7JlwjCMGADWh9_3JnHgpTw";

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Only this account may use the blog admin (also enforce in Firestore rules).
export const OWNER_EMAIL =
  env.VITE_OWNER_EMAIL || "theshaguntyagi@gmail.com";

// getMessaging() throws on browsers without service-worker/push support
// (older Safari, some iOS). Guard it so it can't crash the whole app at import.
export async function getMessagingIfSupported() {
  try {
    if (await isSupported()) return getMessaging(app);
  } catch (e) {
    console.warn("Firebase Messaging not supported in this browser:", e);
  }
  return null;
}
