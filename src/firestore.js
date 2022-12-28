// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc  } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getFunctions } from 'firebase/functions';
import { getPerformance } from "firebase/performance";

// Initialize Firebase
const app = initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
});

// Initialize services
export const db = getFirestore();
export const auth = getAuth(app);
export const functions = getFunctions(app);
export const perf = getPerformance(app);

//functions
export async function updateUserInfo(uid, data) {
    return new Promise((resolve) => {
        updateDoc(doc(db, "users", uid), data).then(() => {
            resolve()
        })
    })
}