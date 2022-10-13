import React, { useContext, useState, useEffect } from 'react'
import { auth } from './firestore'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendSignInLinkToEmail } from 'firebase/auth'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    async function sendVerificationEmail() {
        await sendEmailVerification(auth.currentUser)
        .then(() => {
            console.log('email sent')
        })
    }

    async function signup(email, password) {
        await createUserWithEmailAndPassword(auth, email, password);
        sendVerificationEmail()
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
        sendVerificationEmail,
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