import React, { useContext } from 'react'
import { UserContext } from './UserContext'
import Navbar from './Navbar'

const DashboardLayout = ({ activeMenu, children }) => {

  const { user } = useContext(UserContext)

  return (
    <div className='min-h-screen'>
      <Navbar activeMenu={activeMenu} />
      {user && <div className='container mx-auto px-4 pt-6 pb-6'>{children}</div>}
    </div>
  )
}

export default DashboardLayout
