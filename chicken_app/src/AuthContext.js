import React, { useContext, useState, useEffect } from 'react'
import { auth } from './firestore'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification } from 'firebase/auth'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    async function signup(email, password) {
        let user = null;
        try{
            user = await createUserWithEmailAndPassword(auth, email, password);
            sendEmailVerification(auth.currentUser)
              .then(() => {
                console.log('sent email')
              });
          }catch (error){
            console.log(error.message);
          }
        return user;
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
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