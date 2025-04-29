// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBx-lLp-cOkPP1TfOEecxfRHD-LaiUnAD8",
  authDomain: "producto3-movil.firebaseapp.com",
  projectId: "producto3-movil",
  storageBucket: "producto3-movil.firebasestorage.app",
  messagingSenderId: "293593524205",
  appId: "1:293593524205:web:8e8101438b6f422e5fa9e4",
  measurementId: "G-XS2FFGLQ95",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
