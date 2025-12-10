import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBuhIweXIr-GYRx40Cy_zOMo-MXUAT1gtM",
  authDomain: "proiect-qr-osfiir.firebaseapp.com",
  projectId: "proiect-qr-osfiir",
  storageBucket: "proiect-qr-osfiir.firebasestorage.app",
  messagingSenderId: "809186361972",
  appId: "1:809186361972:web:af125d9bb23f3ee6194721",
  measurementId: "G-9V6Y22VTXX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);