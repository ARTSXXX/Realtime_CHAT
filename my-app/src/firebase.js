import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAVebD4amQ66n2XP4fXVztUD2zbmrT5td0",
  authDomain: "test-ac98f.firebaseapp.com",
  projectId: "test-ac98f",
  storageBucket: "test-ac98f.appspot.com",
  messagingSenderId: "104512179176",
  appId: "1:104512179176:web:4d4310185c10784aa2b25d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();