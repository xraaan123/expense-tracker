// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEXfTPPP5Er7EyTQMctvDSZTYVRLz8g2w", // process.env.NEXT_PUBLIC_FIREBASE_API_KEY
  authDomain: "expense-tracker-c105f.firebaseapp.com", // process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
  projectId: "expense-tracker-c105f", // process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  storageBucket: "expense-tracker-c105f.appspot.com", // process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
  messagingSenderId: "668493169179", // process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
  appId: "1:668493169179:web:d353d34d1813855081eebe", // process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
