// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCP-mtdRyXPWDAbIareWFMiVg9UJlEMfJI",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "campus-lost-found-a21b8.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "campus-lost-found-a21b8",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "campus-lost-found-a21b8.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "427890974642",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:427890974642:web:03c0f735ec1e7cef19ceab",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;