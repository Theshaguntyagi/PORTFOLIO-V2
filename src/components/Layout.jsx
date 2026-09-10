import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion as Motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import VideoBackground from './VideoBackground';
import Footer from "./Footer";
import Deferred from "./Deferred";
import '../styles/Layout.css';

// ChatWidget is heavy (chat UI) and not needed for first paint → defer + lazy.
const ChatWidget = lazy(() => import("./ChatWidget"));

const Layout = () => {
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  // 🔔 NOTIFICATION PERMISSION — deferred to idle + Firebase loaded lazily
  // (keeps the 370 KB Firebase SDK off the initial/critical load path).
  useEffect(() => {
    const run = async () => {
      try {
        if (!('Notification' in window) || Notification.permission === 'denied') return;

        // Root cause of the "Browser errors were logged to the console"
        // Lighthouse/Best-Practices failure: VITE_FIREBASE_VAPID_KEY is
        // empty until it's actually generated (Firebase Console -> Project
        // Settings -> Cloud Messaging -> Web Push certificates). Without
        // it, this code used to still (a) pop the native notification
        // permission prompt on every fresh visit for every visitor, then
        // (b) call getToken() with an empty vapidKey, which Firebase always
        // rejects -- guaranteeing a console.error on any visit where
        // permission got granted. Bail out before either happens until a
        // real key is configured.
        const { db, getMessagingIfSupported, VAPID_KEY } = await import('../firebase');
        if (!VAPID_KEY) return;

        const permission =
          Notification.permission === 'granted' ? 'granted' : await Notification.requestPermission();
        if (permission !== 'granted') return;

        const [{ getToken }, fs] = await Promise.all([
          import('firebase/messaging'),
          import('firebase/firestore'),
        ]);
        const messaging = await getMessagingIfSupported();
        if (!messaging) return;
        
        let token;
        if (import.meta.env.PROD) {
          const registration = await navigator.serviceWorker.ready;
          token = await getToken(messaging, { vapidKey: VAPID_KEY, serviceWorkerRegistration: registration });
        } else {
          token = await getToken(messaging, { vapidKey: VAPID_KEY });
        }
        if (!token) return;

        const subscribersRef = fs.collection(db, 'notificationSubscribers');
        const snapshot = await fs.getDocs(fs.query(subscribersRef, fs.where('token', '==', token)));
        if (!snapshot.empty) return;
        await fs.addDoc(subscribersRef, { token, createdAt: new Date() });
      } catch (error) {
        console.error('Notification error:', error);
      }
    };
    const ric = window.requestIdleCallback || ((cb) => setTimeout(cb, 3000));
    const id = ric(run, { timeout: 5000 });
    return () => (window.cancelIdleCallback || clearTimeout)(id);
  }, []);

  // 🎨 THEME LOGIC (FIXED)
  useEffect(() => {
    document.body.className = `${theme}-theme`;
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleThemeChange = () => {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme && savedTheme !== theme) {
        setTheme(savedTheme);
      }
    };
    window.addEventListener('theme-change', handleThemeChange);
    return () => window.removeEventListener('theme-change', handleThemeChange);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      setTimeout(() => window.dispatchEvent(new Event('theme-change')), 0);
      return next;
    });
  };

  return (
    <>
    <VideoBackground theme={theme}/>
    <div className="layout-wrapper">
      
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="main-content">
        <AnimatePresence mode="wait">
          <Motion.div
            key={location.pathname}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <Outlet />
          </Motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <Suspense fallback={null}>
        <Deferred><ChatWidget /></Deferred>
      </Suspense>
    </div>
    </>
  );
};

export default Layout;
