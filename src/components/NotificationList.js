import React from 'react'
import { useAppContext } from '../contexts/AppContext'
import NotificationBadge from './NotificationBadge'

const NotificationsList = () => {
    const { notifications } = useAppContext()
    return (
        <div className="fixed p-4 flex flex-col gap-2 right-0">
            {notifications.map((notification) => (
                <NotificationBadge
                    key={notification.id}
                    id={notification.id}
                    title={notification.title}
                    content={notification.content}
                />
            ))}
        </div>
    )
}

export default NotificationsList
