/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyC0IiATCY5LacO2hHLKHpJWNkboxbwMmM4",
  authDomain: "web-app-5da25.firebaseapp.com",
  projectId: "web-app-5da25",
  storageBucket: "web-app-5da25.appspot.com",
  messagingSenderId: "1764747410",
  appId: "1:1764747410:web:2437e705c16c81a7e01e4b"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('🔔 Background message received:', payload);
});
