import React from 'react'

const NavBarTab = ({ activeKey, navbarKey, hrefLink }) => {
    const tabCss = 'inline-block py-3 px-4 font-semibold'
    const unselectedTabCss = ' bg-neutral-700 text-white'
    const selectedTabCss =
        ' bg-white text-black border-l border-t border-r rounded-t'
    return (
        <li className="-mb-px mr-1">
            <a
                className={
                    activeKey === navbarKey
                        ? `${tabCss}${selectedTabCss}`
                        : `${tabCss}${unselectedTabCss}`
                }
                href={hrefLink}
            >
                {navbarKey}
            </a>
        </li>
    )
}

export default NavBarTab
