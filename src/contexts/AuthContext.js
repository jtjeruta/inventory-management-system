import React, {
    createContext,
    useContext,
    useMemo,
    useState,
    useEffect,
} from 'react'
import {
    getAuth as getFirebaseAuth,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    getDocs,
    addDoc,
    collection,
    collectionGroup,
} from 'firebase/firestore'

import { useAppContext } from './AppContext'
import { initFirebase } from '../lib/firebase'

const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const AppContext = useAppContext()
    const [authenticating, setAuthenticating] = useState(false)
    const [user, setUser] = useState(null)

    initFirebase()

    const auth = getFirebaseAuth()
    const db = getFirestore()

    const getUserDetails = async (id) => {
        try {
            const docSnap = await getDoc(doc(db, 'user-details', id))

            if (!docSnap.exists()) {
                throw new Error('user details not found')
            }

            return docSnap.data()
        } catch (error) {
            AppContext.addNotification({
                type: 'error',
                title: 'Something went wrong.',
                content: 'Please try again later.',
            })

            return null
        }
    }
    const getDocsOfCollection = async (id, name) => {
        try {
            const querySnap = await getDocs(collectionGroup(db, id))
            const map = []
            querySnap.forEach((docIteration) => {
                map.push([docIteration.id, docIteration.data()[name]])
            })
            return map
        } catch (error) {
            AppContext.addNotification({
                type: 'error',
                title: 'Something went wrong.',
                content: 'Please try again later.',
            })
            return null
        }
    }

    // Listen to onAuthStateChanged
    useEffect(() => {
        setAuthenticating(true)

        auth.onAuthStateChanged(async (authUser) => {
            if (authUser) {
                const userDetails = await getUserDetails(authUser.uid)
                if (!userDetails) return
                setUser({
                    id: authUser.uid,
                    email: authUser.email,
                    ...userDetails,
                })
            }

            setAuthenticating(false)
        })
    }, [])

    const signin = async (email, password) => {
        let loginUser = null

        try {
            const response = await signInWithEmailAndPassword(
                auth,
                email,
                password
            )

            loginUser = {
                id: response.user.uid,
                email: response.user.email,
            }
        } catch (error) {
            AppContext.addNotification({
                type: 'error',
                title: 'Something went wrong.',
                content: 'Please try again later.',
            })

            return [false]
        }

        const userDetails = await getUserDetails(loginUser.id)

        if (!userDetails) return [false]

        setUser({ ...loginUser, ...userDetails })

        AppContext.addNotification({
            type: 'success',
            title: `Hi ${userDetails.firstName}!`,
            content: 'Welcome back.',
        })

        return [true, loginUser]
    }
    const vendorAdd = async (
        vendorName,
        vendorContactNumber,
        vendorEmail,
        vendorAddress
    ) => {
        let vendorAddChecker = null
        try {
            vendorAddChecker = {
                vendorName,
                vendorContactNumber,
                vendorEmail,
                vendorAddress,
            }
            addDoc(collection(db, 'vendor'), vendorAddChecker)
        } catch (error) {
            console.log(error)
            AppContext.addNotification({
                type: 'error',
                title: 'Something went wrong.',
                content: 'Please try again later.',
            })

            return [false]
        }

        AppContext.addNotification({
            type: 'success',
            title: 'Successfully added Vendor!',
            content: `${vendorName} has been added`,
        })

        return [true]
    }
    const productAdd = async (
        productName,
        productCost,
        productResellPrice,
        productMarkup
    ) => {
        let productAddChecker = null
        try {
            productAddChecker = {
                productName,
                productCost,
                productResellPrice,
                productMarkup,
            }
            addDoc(collection(db, 'product'), productAddChecker)
        } catch (error) {
            console.log(error)
            AppContext.addNotification({
                type: 'error',
                title: 'Something went wrong.',
                content: 'Please try again later.',
            })

            return [false]
        }

        AppContext.addNotification({
            type: 'success',
            title: 'Successfully added Product!',
            content: `${productName} has been added`,
        })

        return [true]
    }
    const customerAdd = async (
        customerName,
        customerContactNumber,
        customerEmail,
        customerAddress
    ) => {
        let customerAddChecker = null
        try {
            customerAddChecker = {
                customerName,
                customerContactNumber,
                customerEmail,
                customerAddress,
            }
            addDoc(collection(db, 'customer'), customerAddChecker)
        } catch (error) {
            console.log(error)
            AppContext.addNotification({
                type: 'error',
                title: 'Something went wrong.',
                content: 'Please try again later.',
            })

            return [false]
        }

        AppContext.addNotification({
            type: 'success',
            title: 'Successfully added Customer!',
            content: `${customerName} has been added`,
        })

        return [true]
    }
    const poAdd = async (poVendor, poProduct, poRemarks) => {
        let poAddChecker = null
        const poDate = new Date()
        try {
            poAddChecker = {
                poVendor,
                poProduct,
                poRemarks,
                poDate,
            }
            addDoc(collection(db, 'purchaseOrder'), poAddChecker)
        } catch (error) {
            console.log(error)
            AppContext.addNotification({
                type: 'error',
                title: 'Something went wrong.',
                content: 'Please try again later.',
            })

            return [false]
        }

        AppContext.addNotification({
            type: 'success',
            title: 'Successfully added Product Order!',
            content: `Purchase order has been logged`,
        })

        return [true]
    }
    const soAdd = async (soCustomer, soProduct, soRemarks) => {
        let soAddChecker = null
        const soDate = new Date()
        const soSalesRep = user.id
        try {
            soAddChecker = {
                soCustomer,
                soProduct,
                soRemarks,
                soDate,
                soSalesRep,
            }
            addDoc(collection(db, 'salesOrder'), soAddChecker)
        } catch (error) {
            console.log(error)
            AppContext.addNotification({
                type: 'error',
                title: 'Something went wrong.',
                content: 'Please try again later.',
            })

            return [false]
        }

        AppContext.addNotification({
            type: 'success',
            title: 'Successfully added Sale Order!',
            content: `Sale order has been logged`,
        })

        return [true]
    }

    const signout = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            AppContext.addNotification({
                type: 'error',
                title: 'Something went wrong.',
                content: 'Please try again later.',
            })

            return [false]
        }

        setUser(null)
        return [true]
    }

    const value = useMemo(
        () => ({
            signin,
            signout,
            vendorAdd,
            productAdd,
            customerAdd,
            poAdd,
            soAdd,
            user,
            authenticating,
            getDocsOfCollection,
        }),
        [user, authenticating]
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuthContext = () => useContext(AuthContext)

export { AuthContext, AuthContextProvider, useAuthContext }
