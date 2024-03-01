// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  forEach,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXF9NP7dCWDAQQSvQ_fCFMRWxJVeGnUak",
  authDomain: "instagram-56808.firebaseapp.com",
  databaseURL: "https://instagram-56808-default-rtdb.firebaseio.com",
  projectId: "instagram-56808",
  storageBucket: "instagram-56808.appspot.com",
  messagingSenderId: "844967303568",
  appId: "1:844967303568:web:651dfb874888fb882a3b15",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
  app,
  db,
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  forEach,
};
