import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBUX7KDGiH0WLp9RNlmnebV8WMH7kbQTR4",
  authDomain: "fits-373bb.firebaseapp.com",
  projectId: "fits-373bb",
  storageBucket: "fits-373bb.firebasestorage.app",
  messagingSenderId: "387179060705",
  appId: "1:387179060705:web:c33fce92d65fcdc016c6a0",
  measurementId: "G-S55JZ8CPSQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);