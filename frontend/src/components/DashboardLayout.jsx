import React, { useContext } from 'react'
import { UserContext } from './UserContext'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, FileText, Settings, LayoutTemplate, Target } from 'lucide-react'
import { ProfileInfoCard } from './Cards'

const SidebarItem = ({ icon: Icon, label, path, active }) => (
  <Link to={path} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active ? 'bg-primary text-white shadow-md' : 'text-text-muted hover:bg-secondary hover:text-primary'}`}>
    <Icon size={20} />
    <span className="font-semibold text-sm">{label}</span>
  </Link>
)

const DashboardLayout = ({ children, hideSidebar = false }) => {
  const { user } = useContext(UserContext)
  const location = useLocation()

  return (
    <div className='min-h-screen bg-app-bg flex'>
      {/* Sidebar */}
      {!hideSidebar && (
        <aside className="w-64 bg-white border-r border-app-border fixed top-0 left-0 h-full flex flex-col z-10 hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-app-border shrink-0">
          <Link to='/' className='flex items-center gap-2 group'>
            <div className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm'>
              <FileText size={18} className='text-white' />
            </div>
            <span className='text-xl font-extrabold text-text-main tracking-tight'>
              CVPilot
            </span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" path="/dashboard" active={location.pathname === '/dashboard'} />
          <SidebarItem icon={LayoutTemplate} label="Templates" path="/templates" active={location.pathname === '/templates'} />
          <SidebarItem icon={Target} label="ATS Reports" path="/ats-reports" active={location.pathname === '/ats-reports'} />
        </div>

        <div className="p-4 border-t border-app-border shrink-0">
          <SidebarItem icon={Settings} label="Settings" path="/settings" active={location.pathname === '/settings'} />
          {user && (
            <div className="mt-4 pt-4 border-t border-app-border">
              <ProfileInfoCard />
            </div>
          )}
        </div>
      </aside>
      )}

      {/* Main Content */}
      <main className={`flex-1 flex flex-col min-h-screen max-w-[100vw] ${!hideSidebar ? 'md:ml-64' : ''} overflow-x-hidden`}>
        {/* Mobile Header */}
        <div className="md:hidden h-16 bg-white border-b border-app-border flex items-center px-4 justify-between shrink-0">
           <Link to='/' className='flex items-center gap-2'>
            <div className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm'>
              <FileText size={18} className='text-white' />
            </div>
            <span className='text-xl font-extrabold text-text-main tracking-tight'>
              CVPilot
            </span>
          </Link>
          {user && <ProfileInfoCard compact />}
        </div>
        <div className="flex-1 p-4 md:p-8 overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout
