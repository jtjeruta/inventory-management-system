import React, { createContext, useContext, useEffect, useMemo } from 'react'
import { initializeApp } from 'firebase/app'

const FirebaseContext = createContext()

const FirebaseContextProvider = ({ children }) => {
    useEffect(() => {
        async function init() {
            const firebaseConfig = {
                apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
                authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
                projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
                storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
                messagingSenderId:
                    process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
                appId: process.env.REACT_APP_FIREBASE_APP_ID,
                measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
            }

            await initializeApp(firebaseConfig)
        }

        init()
    })

    const value = useMemo(() => ({}), [])

    return (
        <FirebaseContext.Provider value={value}>
            {children}
        </FirebaseContext.Provider>
    )
}

const useFirebaseContext = () => useContext(FirebaseContext)

export { FirebaseContext, FirebaseContextProvider, useFirebaseContext }
