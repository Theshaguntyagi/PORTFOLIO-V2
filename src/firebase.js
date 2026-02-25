import { initializeApp } from "firebase/app"; 
import { getFirestore } from "firebase/firestore"; 
import { getMessaging } from "firebase/messaging"; 
const firebaseConfig = { apiKey: "AIzaSyC0IiATCY5LacO2hHLKHpJWNkboxbwMmM4",
   authDomain: "web-app-5da25.firebaseapp.com", projectId: "web-app-5da25",
    storageBucket: "web-app-5da25.firebasestorage.app",
     messagingSenderId: "1764747410",
      appId: "1:1764747410:web:2437e705c16c81a7e01e4b", 
      measurementId: "G-FWLZR29XHY" };
       const app = initializeApp(firebaseConfig); 
       export const db = getFirestore(app);
 export const messaging = getMessaging(app);