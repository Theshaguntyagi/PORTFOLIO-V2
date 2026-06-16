import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion as Motion, useReducedMotion } from 'framer-motion';
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
    return savedTheme || 'dark';
  });

  // 🔔 NOTIFICATION PERMISSION — deferred to idle + Firebase loaded lazily
  // (keeps the 370 KB Firebase SDK off the initial/critical load path).
  useEffect(() => {
    const run = async () => {
      try {
        if (!('Notification' in window) || Notification.permission === 'denied') return;
        const permission =
          Notification.permission === 'granted' ? 'granted' : await Notification.requestPermission();
        if (permission !== 'granted') return;

        const [{ db, getMessagingIfSupported, VAPID_KEY }, { getToken }, fs] = await Promise.all([
          import('../firebase'),
          import('firebase/messaging'),
          import('firebase/firestore'),
        ]);
        const messaging = await getMessagingIfSupported();
        if (!messaging) return;
        const token = await getToken(messaging, { vapidKey: VAPID_KEY });
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

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
    <VideoBackground theme={theme}/>
    <div className="layout-wrapper">
      
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="main-content">
        <Motion.div
          key={location.pathname}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <Outlet />
        </Motion.div>
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
