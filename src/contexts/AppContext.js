import React, { createContext, useContext, useMemo, useState } from 'react'
import { v4 as uuid } from 'uuid'

const AppContext = createContext()

const AppContextProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([])

    const addNotification = ({ type, title, content }) => {
        setNotifications((prev) => [
            ...prev,
            { id: uuid(), type, title, content },
        ])
    }

    const removeNotification = (id) => {
        setNotifications((prev) => prev.filter((notif) => notif.id !== id))
    }

    const value = useMemo(
        () => ({ notifications, addNotification, removeNotification }),
        [notifications]
    )

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

const useAppContext = () => useContext(AppContext)

export { AppContext, AppContextProvider, useAppContext }
