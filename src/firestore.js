// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getFirestore, collection, getDocs, onSnapshot, doc
} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

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

// Collection Reference
const colRef = collection(db, 'farms');

// Get Collection Data
export function getFarms(){
    let farms = [];
    getDocs(colRef)
    .then( (snapshot) => {
        console.log(snapshot.docs)
        snapshot.docs.forEach((doc)=>{
            farms.push({...doc.data(), id:doc.id})
        })
        console.log(farms)
    }).catch(err =>{
        console.log(err)
    })
    return farms;
}

export const auth = getAuth(app);

export function getFarm(id){
    let farm = '';
    const db = getFirestore();
    const docRef = useCallback(() => { return doc(db, "farms", id) }, [db, id])

    return farm;
}
