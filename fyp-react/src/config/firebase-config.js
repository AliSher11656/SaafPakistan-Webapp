// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYnKgYWS4euL5VzVvCfTlRx7ejkPhCDsI",
  authDomain: "saafpakistan123.firebaseapp.com",
  projectId: "saafpakistan123",
  storageBucket: "saafpakistan123.appspot.com",
  messagingSenderId: "355966022483",
  appId: "1:355966022483:web:ee8efcce96f5b2d7dca7a6",
  measurementId: "G-W5CMSHMF5W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
