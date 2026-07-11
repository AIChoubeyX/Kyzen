// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "kyzen-fe551.firebaseapp.com",
  projectId: "kyzen-fe551",
  storageBucket: "kyzen-fe551.firebasestorage.app",
  messagingSenderId: "229340689796",
  appId: "1:229340689796:web:c5098f379a8732064919d1",
  measurementId: "G-1ZSSG1T0VK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
