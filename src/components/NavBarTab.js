import React from 'react'
import { Link } from 'react-router-dom'

const NavBarTab = ({ active, navbarKey, hrefLink }) => {
    const tabCss = 'inline-block py-3 px-4 font-semibold'
    const unselectedTabCss = ' bg-neutral-700 text-white'
    const selectedTabCss =
        ' bg-white text-black border-l border-t border-r rounded-t'

    return (
        <li className="-mb-px mr-1">
            <Link
                className={
                    active
                        ? `${tabCss}${selectedTabCss}`
                        : `${tabCss}${unselectedTabCss}`
                }
                to={hrefLink}
            >
                {navbarKey}
            </Link>
        </li>
    )
}

export default NavBarTab
