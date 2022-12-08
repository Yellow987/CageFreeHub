import React, { useContext, useState, useEffect } from 'react'
import { auth } from './firestore'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification } from 'firebase/auth'
import { getFirestore, getDoc, doc } from 'firebase/firestore'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [currentUserInfo, setCurrentUserInfo] = useState()
    const [loading, setLoading] = useState(true)

    function doEmailVerification() {
        sendEmailVerification(currentUser)
    }

    async function signup(email, password) {
        await createUserWithEmailAndPassword(auth, email, password);
    }

    async function login(email, password) {
        return await signInWithEmailAndPassword(auth, email, password)
    }

    function logout(){
        return signOut(auth)
    }

    function setCurrentUserInfoAfterSignup(info) {
        setCurrentUserInfo(info)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            if (user) {
                getDoc(doc(getFirestore(), "users", user.uid)).then((doc) => {
                    setCurrentUserInfo(doc.data())
                    setLoading(false)
                })
            }
            if (!user) {
                setLoading(false)
            }
        }) 
        return unsubscribe
    }, [])

    const value = { 
        doEmailVerification,
        setCurrentUserInfoAfterSignup,
        currentUser,
        currentUserInfo,
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