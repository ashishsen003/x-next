// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "x-next-62601.firebaseapp.com",
  projectId: "x-next-62601",
  storageBucket: "x-next-62601.appspot.com",
  messagingSenderId: "747719794573",
  appId: "1:747719794573:web:a1f49f598581860f5b27c4",
  // measurementId: "G-153Z8D0RYM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);