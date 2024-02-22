// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAD9flqa4eL2Oe9MClvSyI00uKO74MfkuA",
  authDomain: "vendas-carros.firebaseapp.com",
  projectId: "vendas-carros",
  storageBucket: "vendas-carros.appspot.com",
  messagingSenderId: "208859082398",
  appId: "1:208859082398:web:b4a8445335b7c4890ed58f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);


export { db, auth, storage };

