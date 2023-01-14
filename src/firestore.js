// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc, getDoc, getCountFromServer, collection, query, where } from 'firebase/firestore'
import { getAuth, applyActionCode } from 'firebase/auth'
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getPerformance } from "firebase/performance";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { setDoc } from 'firebase/firestore';


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
/* eslint-disable-next-line no-restricted-globals */
if (process.env.REACT_APP_STAGE === 'dev') { self.FIREBASE_APPCHECK_DEBUG_TOKEN = process.env.REACT_APP_APPCHECK_DEBUG_TOKEN; }
export const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LdvAsAjAAAAAIdzKR1hpgWpePmJIXoYbdaO7tTL'),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true
});

//Hide comments on production
if (process.env.REACT_APP_STAGE === "prod") {
  console.log = function() {};
}

//functions
export async function updateUserInfo(uid, data) {
  return new Promise((resolve) => {
    updateDoc(doc(db, "users", uid), data).then(() => {
      resolve()
    })
  })
}

export async function getUserInfo(uid) {
  return new Promise((resolve) => {
    getDoc(doc(db, "users", uid)).then((doc) => {
      if (doc.exists()) {
        resolve(doc.data())
      } else {
        resolve({})
      }
    })
  })
}

export async function getCountOfFarmsToDisplay() {
    const coll = collection(db, "farms")
    const query_ = query(coll, where('status', '==', 'approved'))
    const snapshot = await getCountFromServer(query_)
    return snapshot.data().count
}

export async function copyOverClaimedProfile(copiedProfileID, copyToProfileID) {
  return new Promise((resolve) => {
    getFarm(copiedProfileID).then((skeletonData) => {
      setFarm(copyToProfileID, {...skeletonData, claimed:true, status:"incomplete"}).then(() => {
        updateFarm(copiedProfileID, {status: "claimedSkeletonAccount"}).then(() => {
          resolve()
        })
      })
    })
  })
}

export async function updateFarm(profileID, data) { 
  return new Promise((resolve) => {
    updateDoc(doc(db, "farms", profileID), data).then(() => {
      resolve()
    })
  })
}

async function setFarm(profileID, data) { 
  return new Promise((resolve) => {
    setDoc(doc(db, "farms", profileID), data).then(() => {
      resolve()
    })
  })
}

async function getFarm(profileID) {
  return new Promise((resolve) => {
    getDoc(doc(db, "farms", profileID)).then((doc) => {
      resolve(doc.data())
    })
  })
}

export function sendVerificationEmail() {
  httpsCallable(functions, 'sendVerificationEmail')({ stage:process.env.REACT_APP_STAGE }).then((result) => {console.log(result); })
}

export function adminActionOnStatus(emailData) {
  httpsCallable(functions, 'adminActionOnStatus')({ ...emailData, stage:process.env.REACT_APP_STAGE })
  .then((result) => {console.log(result)})
}

export async function verifyEmailViaActionCode(actionCode) {
  return new Promise((resolve, reject) => {
    applyActionCode(auth, actionCode).then((resp) => {
      resolve()
    })
    .catch((error) => {
      reject(error)
    })
  })
}