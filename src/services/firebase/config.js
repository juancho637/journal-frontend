// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEhFadPFIJSiiRi-uDqXoAtWTj-LIEn9k",
  authDomain: "journal-408ae.firebaseapp.com",
  projectId: "journal-408ae",
  storageBucket: "journal-408ae.appspot.com",
  messagingSenderId: "171103444827",
  appId: "1:171103444827:web:acb9398c0a96a6f72ac47e",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);

export const FirebaseFirestore = getFirestore(FirebaseApp);
