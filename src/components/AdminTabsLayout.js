import React from 'react'

const AdminTabsLayout = ({
    addButton,
    tableButton,
    AddContent,
    TableContent,
    setTab,
    tab,
}) => {
    return (
        <div className="flex md:container mx-auto">
            <div className="flex w-full p-5 pr-10">
                <div>
                    <button
                        className="block box-border h-32 w-32 bg-cyan-500 mt-16 ml-10 py-10 px-10 font-semibold rounded-l-lg"
                        onClick={() => setTab(0)}
                    >
                        {addButton || 'Add Record'}
                    </button>
                    <button
                        className="block box-border h-32 w-32 bg-teal-500 my-2 ml-10 py-10 px-10 font-semibold rounded-l-lg"
                        onClick={() => setTab(1)}
                    >
                        {tableButton || 'Records'}
                    </button>
                </div>

                {tab === 0 ? (
                    <div className="bg-cyan-500 grow py-2 px-10 shadow-md dark:bg-gray-800 dark:border-gray-700">
                        {AddContent}
                    </div>
                ) : (
                    <div className="bg-teal-500 grow shadow-md dark:bg-gray-800 dark:border-gray-700">
                        {TableContent}
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminTabsLayout
