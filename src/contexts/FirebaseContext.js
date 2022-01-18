import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'
import { initializeApp } from 'firebase/app'

const FirebaseContext = createContext()

const FirebaseContextProvider = ({ children }) => {
    const [firebase, setFirebase] = useState(null)

    useEffect(() => {
        function init() {
            const firebaseConfig = {
                apiKey: 'AIzaSyAoiidkgcOXyec7hhf3RHzzISx0Qu2Ruqk',
                authDomain: 'ims---staging.firebaseapp.com',
                projectId: 'ims---staging',
                storageBucket: 'ims---staging.appspot.com',
                messagingSenderId: '1050610650976',
                appId: '1:1050610650976:web:cff3d8d351fd4282555805',
                measurementId: 'G-VLHDNRHCHN',
            }

            setFirebase(initializeApp(firebaseConfig))
        }

        init()
    })

    const value = useMemo(
        () => ({
            firebase,
        }),
        [firebase]
    )

    return (
        <FirebaseContext.Provider value={value}>
            {children}
        </FirebaseContext.Provider>
    )
}

const useFirebaseContext = () => useContext(FirebaseContext)

export { FirebaseContext, FirebaseContextProvider, useFirebaseContext }
