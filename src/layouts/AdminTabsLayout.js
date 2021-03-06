import React from 'react'

const AdminTabsLayout = ({
    addButton,
    tableButton,
    AddContent,
    TableContent,
    setTab,
    tab,
}) => {
    const style = { transform: 'translateX(1px)' }

    return (
        <>
            <div>
                <button
                    className="block box-border w-32 bg-green-100 mt-16 ml-10 py-10 font-semibold rounded-l-lg text-cyan-900"
                    onClick={() => setTab(0)}
                    style={tab === 0 ? style : {}}
                >
                    {tableButton || 'Records'}
                </button>
                <button
                    className="block box-border w-32 bg-sky-100 my-2 ml-10 py-10 font-semibold rounded-l-lg text-green-900"
                    onClick={() => setTab(1)}
                    style={tab === 1 ? style : {}}
                >
                    {addButton || 'Add Record'}
                </button>
            </div>

            {tab === 0 ? (
                <div className="bg-green-100 grow shadow-md dark:bg-gray-800 dark:border-gray-700">
                    {TableContent}
                </div>
            ) : (
                <div className="bg-sky-100 grow py-2 px-10 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    {AddContent}
                </div>
            )}
        </>
    )
}

export default AdminTabsLayout
