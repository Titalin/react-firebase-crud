// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCAAggVA6-r__mqva8Cxm_tx4OIh1zIqtc",
  authDomain: "practica8-1f5f2.firebaseapp.com",
  projectId: "practica8-1f5f2",
  storageBucket: "practica8-1f5f2.firebasestorage.app",
  messagingSenderId: "598984017045",
  appId: "1:598984017045:web:718132f0ebd563869f479c",
  measurementId: "G-59NFPJY018"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
