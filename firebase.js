import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyBPuyHdNV75y1mFqw3pimA__0ktaVf-sFw",
  authDomain: "letofy.firebaseapp.com",
  projectId: "letofy",
  storageBucket: "letofy.firebasestorage.app",
  messagingSenderId: "163907148516",
  appId: "1:163907148516:web:116c47facb33caff0e6af1",
  measurementId: "G-Z5RETRKT5B"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);


