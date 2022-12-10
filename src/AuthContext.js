import React, { useContext, useState, useEffect } from 'react'
import { auth } from './firestore'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification } from 'firebase/auth'
import { getFirestore, doc, setDoc, onSnapshot } from 'firebase/firestore'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [currentUserInfo, setCurrentUserInfo] = useState({})
    const [loading, setLoading] = useState(true)

    function doEmailVerification() {
        sendEmailVerification(currentUser)
    }

    function signup(email, password, data) {
        createUserWithEmailAndPassword(auth, email, password).then((user) => {
            console.log(user.user.uid)
            console.log(data)
            setDoc(doc(getFirestore(), "users", user.user.uid), data).then(() => {
                setCurrentUserInfo(data)
                console.log('woo')
            })
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
            if (user) {
                onSnapshot(doc(getFirestore(), "users", user.uid), (doc) => {
                    if (doc.exists()) {
                        console.log(doc)
                        setCurrentUserInfo(doc.data())
                        setLoading(false)
                    } else {
                        console.log('doc not yet exist')
                        setLoading(false)
                    }
                })
            }
            if (!user) {
                setCurrentUserInfo(null)
                setLoading(false)
            }
        }) 
        return unsubscribe
    }, [])

    const value = { 
        doEmailVerification,
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