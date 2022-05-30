import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router-dom'

const Breadcrumbs = () => {
    const location = useLocation()
    const links = location.pathname.split('/')

    return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                {links.map((link, index) => {
                    const url = links.slice(0, index + 1).join('/')

                    return (
                        <li key={link}>
                            {index !== links.length - 1 ? (
                                <a
                                    href={url || '/'}
                                    className="text-gray-700 hover:text-gray-900 inline-flex items-center"
                                >
                                    <FontAwesomeIcon
                                        icon={
                                            index === 0
                                                ? faHome
                                                : faChevronRight
                                        }
                                        className="mr-2.5"
                                    />
                                    {index === 0 ? 'Home' : link}
                                </a>
                            ) : (
                                <>
                                    <FontAwesomeIcon
                                        icon={faChevronRight}
                                        className="mr-2.5 text-gray-400"
                                    />
                                    <span className="text-gray-400 ml-1 md:ml-2 text-sm font-medium">
                                        {link}
                                    </span>
                                </>
                            )}
                        </li>
                    )
                })}
            </ol>
        </nav>
    )
}

export default Breadcrumbs
