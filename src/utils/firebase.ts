import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyADFnGSVQOBnX8gnCPmR1VgYMVMShb472w",
  authDomain: "resq-land-18f84.firebaseapp.com",
  projectId: "resq-land-18f84",
  storageBucket: "resq-land-18f84.firebasestorage.app",
  messagingSenderId: "331319187893",
  appId: "1:331319187893:web:1cdfec608361060457a1fc"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();