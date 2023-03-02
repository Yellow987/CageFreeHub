// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc, getDoc, getCountFromServer, collection, query, where, deleteDoc } from 'firebase/firestore'
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

declare global {
  // eslint-disable-next-line no-var
  var FIREBASE_APPCHECK_DEBUG_TOKEN: boolean | string | undefined;
}

/* eslint-disable-next-line no-restricted-globals */
if (process.env.REACT_APP_STAGE === 'dev') { self.FIREBASE_APPCHECK_DEBUG_TOKEN = process.env.REACT_APP_APPCHECK_DEBUG_TOKEN; }
const reCaptchaV3ProviderKeyMap: Record<string, string> = {
  dev: '6LdvAsAjAAAAAIdzKR1hpgWpePmJIXoYbdaO7tTL',
  preprod: '6LdvAsAjAAAAAIdzKR1hpgWpePmJIXoYbdaO7tTL',
  prod: '6LcRfxckAAAAALV7tR5ehg14VSTvMHmMzdH_2H-M'
}
export const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(reCaptchaV3ProviderKeyMap[process.env.REACT_APP_STAGE]),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true
});

//Hide comments on production
if (process.env.REACT_APP_STAGE === "prod") {
  console.log = function() {};
}

//data types
interface Location {
  city: string,
  country: Country
}

export interface ContactChannels {
  email?: string,
  phone?: string,
  whatsapp?: string,
  wechat?: string
}

interface ProductDetails {
  capacity: number,
  objectiveCapacity: number,
  unit: string
}

interface CertificationFile {
  name: string,
  url: string
}

interface Image {
  uuid: string,
  data_url: string
}

interface ProductionDetails {
  productionSystem: Array<string>,
  certification: string,
  certifyingOrganization: string,
  certificationFile: CertificationFile,
}

export interface Country {
  label: string,
  value: string
}

export interface SellerData {
  //Meta
  status: 'incomplete' | 'pending' | 'approved' | 'rejected' | 'claimedSkeletonAccount',
  adminLastStatusUpdate: Date,
  creationDate: Date,
  claimed: boolean,

  //Basics
  organizationName: string,
  website: string,

  //locations
  locations: Array<Location>,
  distributionCountries: Array<Country>,

  //Contact
  name: string,
  jobTitle: string,
  contactChannels: ContactChannels,

  //Product details
  productDetails: Record<string, ProductDetails>,
  maxObjectiveCapacity: number,

  //Production details
  productionDetails: ProductionDetails

  //Imagery
  images: Array<Image>,
  logos: Array<Image>
}

//functions
export async function updateUserInfo(uid: string, data: object) {
  return new Promise<void>((resolve) => {
    updateDoc(doc(db, "users", uid), data).then(() => {
      resolve()
    })
  })
}

export async function getUserInfo(uid: string) {
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

export async function getBuyer(uid: string) {
  return new Promise((resolve) => {
    getDoc(doc(db, "buyers", uid)).then((doc) => {
      if (doc.exists()) {
        resolve(doc.data())
      } else {
        resolve({})
      }
    })
  })
}

export async function updateBuyer(uid: string, updateData: object) {
  return new Promise<void>((resolve) => {
    updateDoc(doc(db, "buyers", uid), updateData).then(() => {
      resolve()
    })
  })
}

export async function getCountOfFarmsToDisplay() {
    const coll = collection(db, "farms")
    const query_ = query(coll, where('status', '==', 'approved'))
    const snapshot = await getCountFromServer(query_)
    return snapshot.data().count
}

export async function copyOverClaimedProfile(copiedProfileID: string, copyToProfileID: string) {
  return new Promise<void>((resolve) => {
    getFarm(copiedProfileID).then((skeletonData) => {
      setFarm(copyToProfileID, {...skeletonData, claimed:true, status:"incomplete"}).then(() => {
        updateFarm(copiedProfileID, {status: "claimedSkeletonAccount"}).then(() => {
          resolve()
        })
      })
    })
  })
}

export async function updateFarm(profileID: string, data: object) { 
  return new Promise<void>((resolve) => {
    updateDoc(doc(db, "farms", profileID), data).then(() => {
      resolve()
    })
  })
}

async function setFarm(profileID: string, data: object) { 
  return new Promise<void>((resolve) => {
    setDoc(doc(db, "farms", profileID), data).then(() => {
      resolve()
    })
  })
}

export async function getFarm(profileID: string): Promise<SellerData> {
  console.log(profileID)
  return new Promise((resolve) => {
    getDoc(doc(db, "farms", profileID)).then((doc) => {
      if (doc.exists()) {
        resolve(doc.data() as SellerData)
      }
    })
  })
}

export function sendVerificationEmail() {
  httpsCallable(functions, 'sendVerificationEmail')({ stage:process.env.REACT_APP_STAGE }).then((result) => {console.log(result); })
}

export async function sendEmailAboutApprovalOrRejection(emailData: object) {
  await httpsCallable(functions, 'adminActionOnStatus')({ ...emailData, stage:process.env.REACT_APP_STAGE })
  .then((result) => {console.log(result)})
}

export async function profilependingAdminNotification(isSeller: boolean, uid: string) {
  await httpsCallable(functions, 'profilependingAdminNotification')({ isSeller, uid })
  .then((result) => {console.log(result)})
}

export async function verifyEmailViaActionCode(actionCode: string) {
  return new Promise<void>((resolve, reject) => {
    applyActionCode(auth, actionCode).then(() => {
      resolve()
    })
    .catch((error) => {
      reject(error)
    })
  })
}

export async function deleteBuyerAccount(uid: string) {
  await deleteDoc(doc(db, "buyers", uid))
  await deleteDoc(doc(db, "users", uid))
}
