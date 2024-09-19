import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC60AueBk6hPrCIUd2616z2T_EsXX3SHuQ",
  authDomain: "testing-c78e4.firebaseapp.com",
  projectId: "testing-c78e4",
  storageBucket: "testing-c78e4.appspot.com",
  messagingSenderId: "443049705379",
  appId: "1:443049705379:web:b39bc485739377f5a0a416",
  measurementId: "G-NDZ0QVG2X9"
};

const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app)