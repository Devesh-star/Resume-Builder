import React, { useContext, useState } from 'react'
import { UserContext } from './UserContext'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, FileText, Settings, LayoutTemplate, Target, Menu, X } from 'lucide-react'
import { ProfileInfoCard } from './Cards'

const SidebarItem = ({ icon: Icon, label, path, active, onClick }) => (
  <Link to={path} onClick={onClick} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active ? 'bg-primary text-white shadow-md' : 'text-text-muted hover:bg-secondary hover:text-primary'}`}>
    <Icon size={20} />
    <span className="font-semibold text-sm">{label}</span>
  </Link>
)

const DashboardLayout = ({ children, hideSidebar = false }) => {
  const { user } = useContext(UserContext)
  const location = useLocation()
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const handleMobileSidebarClose = () => setMobileSidebarOpen(false)

  return (
    <div className='min-h-screen bg-app-bg flex'>
      {/* Sidebar */}
      {!hideSidebar && (
        <>
          {/* Mobile Overlay */}
          {mobileSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-20 md:hidden" 
              onClick={handleMobileSidebarClose}
            />
          )}

          <aside className={`w-64 bg-white border-r border-app-border fixed top-0 left-0 h-full flex flex-col z-30 transition-transform duration-300 ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
            <div className="h-16 flex items-center justify-between px-6 border-b border-app-border shrink-0">
              <Link to='/' className='flex items-center gap-2 group' onClick={handleMobileSidebarClose}>
                <div className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm'>
                  <FileText size={18} className='text-white' />
                </div>
                <span className='text-xl font-extrabold text-text-main tracking-tight'>
                  CVPilot
                </span>
              </Link>
              <button className="md:hidden p-1 text-text-muted hover:text-text-main" onClick={handleMobileSidebarClose}>
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
              <SidebarItem icon={LayoutDashboard} label="Dashboard" path="/dashboard" active={location.pathname === '/dashboard'} onClick={handleMobileSidebarClose} />
              <SidebarItem icon={LayoutTemplate} label="Templates" path="/templates" active={location.pathname === '/templates'} onClick={handleMobileSidebarClose} />
              <SidebarItem icon={Target} label="ATS Reports" path="/ats-reports" active={location.pathname === '/ats-reports'} onClick={handleMobileSidebarClose} />
            </div>

            <div className="p-4 border-t border-app-border shrink-0">
              <SidebarItem icon={Settings} label="Settings" path="/settings" active={location.pathname === '/settings'} onClick={handleMobileSidebarClose} />
              {user && (
                <div className="mt-4 pt-4 border-t border-app-border">
                  <ProfileInfoCard />
                </div>
              )}
            </div>
          </aside>
        </>
      )}

      {/* Main Content */}
      <main className={`flex-1 flex flex-col min-h-screen max-w-[100vw] ${!hideSidebar ? 'md:ml-64' : ''} overflow-x-hidden`}>
        {/* Mobile Header */}
        <div className="md:hidden h-16 bg-white border-b border-app-border flex items-center px-4 justify-between shrink-0 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            {!hideSidebar && (
              <button 
                className="p-1 -ml-1 text-text-muted hover:text-text-main"
                onClick={() => setMobileSidebarOpen(true)}
              >
                <Menu size={24} />
              </button>
            )}
            <Link to='/' className='flex items-center gap-2'>
              <div className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm'>
                <FileText size={18} className='text-white' />
              </div>
              <span className='text-xl font-extrabold text-text-main tracking-tight'>
                CVPilot
              </span>
            </Link>
          </div>
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
