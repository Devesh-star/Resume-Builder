import React from 'react'
import { FileText, Github, Twitter, Linkedin } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-white border-t border-app-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 group mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
                <FileText size={18} className="text-white" />
              </div>
              <span className="text-xl font-extrabold text-text-main tracking-tight leading-none">
                CVPilot
              </span>
            </Link>
            <p className="text-sm text-text-muted leading-relaxed mb-6">
              Create professional, ATS-friendly resumes in minutes. Land your dream job with beautifully designed templates.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-text-muted hover:text-primary transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-text-muted hover:text-primary transition-colors"><Github size={20} /></a>
              <a href="#" className="text-text-muted hover:text-primary transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-bold text-text-main uppercase tracking-wider mb-4">Product</h3>
            <ul className="space-y-3">
              <li><Link to="/#features" className="text-sm text-text-muted hover:text-primary transition-colors">Features</Link></li>
              <li><Link to="/#templates" className="text-sm text-text-muted hover:text-primary transition-colors">Templates</Link></li>
              <li><Link to="/#ats" className="text-sm text-text-muted hover:text-primary transition-colors">ATS Checker</Link></li>
              <li><Link to="/examples" className="text-sm text-text-muted hover:text-primary transition-colors">Examples</Link></li>
              <li><Link to="/faq" className="text-sm text-text-muted hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-bold text-text-main uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><Link to="/examples" className="text-sm text-text-muted hover:text-primary transition-colors">Resume Examples</Link></li>
              <li><Link to="/blog" className="text-sm text-text-muted hover:text-primary transition-colors">Career Blog</Link></li>
              <li><Link to="/guide" className="text-sm text-text-muted hover:text-primary transition-colors">How to Write a Resume</Link></li>
              <li><Link to="/help" className="text-sm text-text-muted hover:text-primary transition-colors">Help Center</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold text-text-main uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-sm text-text-muted hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-sm text-text-muted hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="text-sm text-text-muted hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-text-muted hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-app-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-muted">
            &copy; {new Date().getFullYear()} CVPilot. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-sm text-text-muted">
              <span className="w-2 h-2 rounded-full bg-success"></span>
              System Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
