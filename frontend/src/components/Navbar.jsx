import { FileText, Menu, X } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ProfileInfoCard } from './Cards'
import { UserContext } from './UserContext'

const Navbar = () => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="h-16 bg-white/80 backdrop-blur-md border-b border-app-border sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shadow-sm group-hover:bg-primary-hover transition-colors">
            <FileText size={20} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold text-text-main tracking-tight leading-none">
              CVPilot
            </span>
          </div>
        </Link>

        {/* Center: Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/#features" className="text-sm font-medium text-text-muted hover:text-text-main transition-colors">Features</Link>
          <Link to="/#templates" className="text-sm font-medium text-text-muted hover:text-text-main transition-colors">Templates</Link>
          <Link to="/#ats" className="text-sm font-medium text-text-muted hover:text-text-main transition-colors">ATS Checker</Link>
          <Link to="/examples" className="text-sm font-medium text-text-muted hover:text-text-main transition-colors">Examples</Link>
          <Link to="/faq" className="text-sm font-medium text-text-muted hover:text-text-main transition-colors">FAQ</Link>
        </div>

        {/* Right: Actions */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <ProfileInfoCard />
          ) : (
            <>
              <button 
                onClick={() => navigate('/login')} 
                className="text-sm font-medium text-text-main hover:text-primary transition-colors"
              >
                Log in
              </button>
              <button 
                onClick={() => navigate('/signup')} 
                className="btn-primary"
              >
                Build Resume Free
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 -mr-2 text-text-muted hover:text-text-main"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-app-border absolute top-16 left-0 w-full shadow-lg animate-slide-up">
          <div className="px-4 py-4 space-y-4 flex flex-col">
            <Link to="/#features" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-text-main">Features</Link>
            <Link to="/#templates" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-text-main">Templates</Link>
            <Link to="/#ats" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-text-main">ATS Checker</Link>
            <Link to="/examples" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-text-main">Examples</Link>
            <Link to="/faq" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-text-main">FAQ</Link>
            <hr className="border-app-border my-2" />
            {user ? (
              <div className="py-2">
                <ProfileInfoCard />
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => navigate('/login')} 
                  className="btn-outline w-full justify-center"
                >
                  Log in
                </button>
                <button 
                  onClick={() => navigate('/signup')} 
                  className="btn-primary w-full justify-center"
                >
                  Build Resume Free
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar