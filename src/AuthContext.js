import React, { useContext, useState, useEffect } from 'react'
import { auth } from './firestore'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { getFirestore, doc, setDoc, onSnapshot } from 'firebase/firestore'
import LogRocket from 'logrocket'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [currentUserInfo, setCurrentUserInfo] = useState(null)
    const [loading, setLoading] = useState(true)

    async function signup(email, password, data) {
        return new Promise((resolve, reject) => {
            createUserWithEmailAndPassword(auth, email, password)
            .then((user) => {
                setDoc(doc(getFirestore(), "users", user.user.uid), data).then(() => {
                    setCurrentUserInfo(data)
                    resolve(user.user)
                })
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    async function login(email, password) {
        return new Promise((resolve, reject) => {
            signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
                resolve(user)
            })
            .catch((error) => {
                reject(error)
            })
        })
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
                        setCurrentUserInfo(doc.data())
                        setLoading(false)
                    } else {
                        console.log('doc not yet exist')
                        setLoading(false)
                    }
                })
                LogRocket.identify(user.uid, {
                    email: user.email
                  });
            }
            if (!user) {
                setCurrentUserInfo(null)
                setLoading(false)
            }
        }) 
        return unsubscribe
    }, [])

    const value = { 
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