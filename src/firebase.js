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

const getFirebaseApiKey = () => {
  const b64 = env.VITE_FIREBASE_KEY_B64;
  if (b64) return atob(b64);
  return env.VITE_FIREBASE_API_KEY || '';
};

const firebaseConfig = {
  apiKey: getFirebaseApiKey(),
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID,
};

export const VAPID_KEY = env.VITE_FIREBASE_VAPID_KEY;


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
