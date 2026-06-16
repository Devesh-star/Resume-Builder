import { FileText } from 'lucide-react'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ProfileInfoCard } from './Cards'
import { UserContext } from './UserContext'

const Navbar = () => {
  const { user } = useContext(UserContext)

  return (
    <div className='h-16 bg-[#0a0508]/90 backdrop-blur-xl border-b border-white/5 px-4 md:px-0 sticky top-0 z-50'>
      <div className='max-w-6xl mx-auto h-full flex items-center justify-between gap-5'>
        <Link to='/' className='flex items-center gap-3'>
          <div className='w-9 h-9 bg-[#d8386b] rounded-lg flex items-center justify-center'>
            <FileText size={18} className='text-white' />
          </div>
          <span className='text-xl font-bold text-white tracking-tight'>
            CV<span className="text-[#d8386b]">Pilot</span>
          </span>
        </Link>
        {user && <ProfileInfoCard />}
      </div>
    </div>
  )
}

export default Navbar