import React from 'react'

const Tabs = ({ tabs = [], activeTab, setActiveTab }) => {
  return (
    <div className='w-full my-2'>
    <div className='flex flex-wrap bg-slate-800/50 p-1 rounded-2xl border border-slate-700/50'>
      {tabs.map((tab) => (
        <button key={tab.label}
        className={`relative flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-bold rounded-xl transition-all 
        ${activeTab ===  tab.label ? "bg-slate-700/50 text-cyan-400 shadow-lg "
          : "text-slate-500 hover:text-cyan-300 hover:bg-slate-700/30"}`}
          onClick={() => setActiveTab(tab.label)}>
            <span className='relative z-10'>
              {tab.label}

              {activeTab === tab.label && (
                <div className='absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 rounded-xl'>

                </div>
              )}
            </span>
        </button>
      ))}
    </div>
    </div>
  )
}

export default Tabs
