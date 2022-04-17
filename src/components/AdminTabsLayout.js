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
        <div className="w-full h-full bg-slate-300 flex flex-row">
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
                <div className="bg-cyan-500 h-screen w-10/12 mt-8 p-2 align-top">
                    <div className="max-w-screen-md m-auto">{AddContent}</div>
                </div>
            ) : (
                <div className="inline-block bg-teal-500 h-screen w-10/12 mt-8 align-top">
                    {TableContent}
                </div>
            )}
        </div>
    )
}

export default AdminTabsLayout
