// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUX7KDGiH0WLp9RNlmnebV8WMH7kbQTR4",
  authDomain: "fits-373bb.firebaseapp.com",
  projectId: "fits-373bb",
  storageBucket: "fits-373bb.firebasestorage.app",
  messagingSenderId: "387179060705",
  appId: "1:387179060705:web:c33fce92d65fcdc016c6a0",
  measurementId: "G-S55JZ8CPSQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);