// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDq_KFrzYnRhuZE6hAX8Zp7c0SFwKYHko0",
  authDomain: "homechef-5026d.firebaseapp.com",
  projectId: "homechef-5026d",
  storageBucket: "homechef-5026d.appspot.com",
  messagingSenderId: "401382747982",
  appId: "1:401382747982:web:24cd63e09dad596b7bb81f"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);