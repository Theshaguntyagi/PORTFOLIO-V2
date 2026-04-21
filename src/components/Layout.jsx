import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import VideoBackground from './VideoBackground';
import '../styles/Layout.css';

import { messaging, db } from '../firebase';
import { getToken } from 'firebase/messaging';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import Footer from "./Footer";

const Layout = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'dark';
  });

  // 🔔 NOTIFICATION PERMISSION + SAVE TOKEN
  useEffect(() => {
    const requestNotificationPermission = async () => {
      try {
        if (!('Notification' in window)) {
          console.log('❌ Browser does not support notifications');
          return;
        }

        if (Notification.permission === 'denied') {
          console.log('❌ Notification permission denied earlier');
          return;
        }

        const permission =
          Notification.permission === 'granted'
            ? 'granted'
            : await Notification.requestPermission();

        if (permission !== 'granted') {
          console.log('❌ Notification not granted');
          return;
        }

        console.log('✅ Notification permission granted');

        const token = await getToken(messaging, {
          vapidKey:
            'BKwwk4MY3pZ7pj6k3SDCW3xU1Oraaa02T-1e56rMVQXQ8G9JNgicG4sdTn_Q2Hsng7JlwjCMGADWh9_3JnHgpTw',
        });

        if (!token) {
          console.log('❌ No FCM token received');
          return;
        }

        console.log('📩 FCM Token:', token);

        // 🔐 CHECK IF TOKEN ALREADY EXISTS
        const subscribersRef = collection(db, 'notificationSubscribers');
        const q = query(subscribersRef, where('token', '==', token));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          console.log('ℹ️ Token already exists in Firestore');
          return;
        }

        // 💾 SAVE TOKEN
        await addDoc(subscribersRef, {
          token,
          createdAt: new Date(),
        });

        console.log('✅ Token saved to Firestore');
      } catch (error) {
        console.error('🔥 Notification error:', error);
      }
    };

    requestNotificationPermission();
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
        <Outlet />
      </main>
      <Footer />
    </div>
    </>
  );
};

export default Layout;
