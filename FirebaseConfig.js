// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfRHjt7o8rn_KkyqO_YATdzDs58CyqJiI",
  authDomain: "my-market-bba2b.firebaseapp.com",
  projectId: "my-market-bba2b",
  storageBucket: "my-market-bba2b.appspot.com",
  messagingSenderId: "596651729108",
  appId: "1:596651729108:web:b3ed5bb9f96e9ab3475b41",
  measurementId: "G-GMDF5J9SW2"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);

export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);