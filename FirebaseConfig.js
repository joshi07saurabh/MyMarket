// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5c__ENIdUDRChjkDuRO6HqULbNqVly0w",
  authDomain: "mymarket-d73f1.firebaseapp.com",
  projectId: "mymarket-d73f1",
  storageBucket: "mymarket-d73f1.appspot.com",
  messagingSenderId: "254614128174",
  appId: "1:254614128174:web:fbd53d2b36a75ae1efc1bf"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);

export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);