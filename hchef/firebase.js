import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDq_KFrzYnRhuZE6hAX8Zp7c0SFwKYHko0",
  authDomain: "homechef-5026d.firebaseapp.com",
  projectId: "homechef-5026d",
  storageBucket: "homechef-5026d.appspot.com",
  messagingSenderId: "401382747982",
  appId: "1:401382747982:web:25a1fa740ce88a627bb81f"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);