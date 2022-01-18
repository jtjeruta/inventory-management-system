import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'
import { useAppContext } from '../contexts/AppContext'

let timeout = null
const NotificationBadge = ({ id, title, content }) => {
    const { removeNotification } = useAppContext()

    const closeNotif = () => {
        // TODO: add close animation
        clearTimeout(timeout)
        removeNotification(id)
    }

    useEffect(() => {
        timeout = setTimeout(() => closeNotif(), 4000)
    }, [])

    return (
        <div
            className="rounded-b px-4 py-3 shadow-md animate-notif bg-white"
            role="alert"
            style={{ width: 300 }}
        >
            <div className="flex justify-between">
                <div className="flex gap-2">
                    <div className="py-1">
                        <FontAwesomeIcon icon={faCheckCircle} />
                    </div>
                    <div>
                        <p className="font-bold">{title}</p>
                        <p className="text-sm">{content}</p>
                    </div>
                </div>

                <button type="button" onClick={closeNotif}>
                    &times;
                </button>
            </div>
        </div>
    )
}
export default NotificationBadge
