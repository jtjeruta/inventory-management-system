import React from 'react'
import clsx from 'clsx'

const NavBarTab = ({ active, onClick, children }) => {
    const tabCss = 'inline-block py-3 px-4 font-semibold'
    const unselectedTabCss = 'bg-neutral-700 text-white'
    const selectedTabCss =
        'bg-slate-300 border-slate-300 text-black border-l border-t border-r rounded-t'

    return (
        <li style={active ? { transform: 'translateY(1px)' } : {}}>
            <div
                className={clsx([
                    tabCss,
                    active ? selectedTabCss : unselectedTabCss,
                ])}
                onClick={onClick}
            >
                {children}
            </div>
        </li>
    )
}

export default NavBarTab
