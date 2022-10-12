import React, { useContext, useState, useEffect } from 'react'
import { auth } from './firestore'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendSignInLinkToEmail } from 'firebase/auth'
import { db } from './firestore'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState(null)

    async function signup(email, password) {
        const actionCodeSettings = {
            // URL you want to redirect back to. The domain (www.example.com) for this
            // URL must be in the authorized domains list in the Firebase Console.
            url: 'http://localhost:3000/profile',
            // This must be true.
            handleCodeInApp: true,
            iOS: {
              bundleId: 'com.example.ios'
            },
            android: {
              packageName: 'com.example.android',
              installApp: true,
              minimumVersion: '12'
            },
            dynamicLinkDomain: 'example.page.link'
        };
        
        await createUserWithEmailAndPassword(auth, email, password);
        sendSignInLinkToEmail(auth, email, actionCodeSettings)
        .then(() => {
            window.localStorage.setItem('emailForSignIn', email);
        })
    }

    async function login(email, password) {
        return await signInWithEmailAndPassword(auth, email, password)
    }

    function logout(){
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        }) 
        return unsubscribe
    }, [])

    const value = { 
        currentUser,
        signup,
        login,
        logout
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}