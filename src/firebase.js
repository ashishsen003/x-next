// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "x-next-610fe.firebaseapp.com",
  projectId: "x-next-610fe",
  storageBucket: "x-next-610fe.appspot.com",
  messagingSenderId: "475522578647",
  appId: "1:475522578647:web:f46c7c3c882a4e700d1892",
  measurementId: "G-BH1077BWBG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);