// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getFirestore, collection, getDocs
} from 'firebase/firestore'
import { firebaseConfig } from "./FirestoreCreds";
import {getAuth} from 'firebase/auth'
// Initialize Firebase
const app = initializeApp(firebaseConfig);

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
