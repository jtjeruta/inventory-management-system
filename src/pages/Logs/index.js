import React from 'react'
import AdminTabsLayout from '../../components/AdminTabsLayout'

const AdminPage = () => {
    const [tab, setTab] = React.useState(0)
    return (
        <AdminTabsLayout
            addButton="Big logs"
            tableButton="Small Logs"
            AddContent={<Content1 />}
            TableContent={<Content2 />}
            setTab={setTab}
            tab={tab}
        />
    )
}

const Content1 = () => <>Content 1</>
const Content2 = () => <>Content 2</>

export default AdminPage
