import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging } from "firebase/messaging";

// Initialize Firebase
const app = initializeApp({
  // apiKey: "AIzaSyABF4m8puuckAImYCAF5HRFsZ_03J609LQ",
  // authDomain: "admin-panel-76a17.firebaseapp.com",
  // databaseURL: "https://admin-panel-76a17-default-rtdb.firebaseio.com",
  // projectId: "admin-panel-76a17",
  // storageBucket: "admin-panel-76a17.appspot.com",
  // messagingSenderId: "215078169100",
  // appId: "1:215078169100:web:61f5a720a5ff127b645c29",
  // measurementId: "G-7CXT51EQ6T",

  apiKey: "AIzaSyBYnKgYWS4euL5VzVvCfTlRx7ejkPhCDsI",
  authDomain: "saafpakistan123.firebaseapp.com",
  projectId: "saafpakistan123",
  storageBucket: "saafpakistan123.appspot.com",
  messagingSenderId: "355966022483",
  appId: "1:355966022483:web:ee8efcce96f5b2d7dca7a6",
  measurementId: "G-W5CMSHMF5W",
});
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const messaging = getMessaging(app);
