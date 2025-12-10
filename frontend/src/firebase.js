import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Importul Firestore

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

// Exportăm autentificarea
export const auth = getAuth(app);

// Exportăm baza de date (ASTA LIPSEA)
export const db = getFirestore(app);