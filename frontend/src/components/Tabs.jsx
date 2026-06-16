import React from 'react'

const Tabs = ({ tabs = [], activeTab, setActiveTab }) => {
  return (
    <div className='flex bg-white p-1 rounded-2xl border border-stone-200 shadow-sm'>
      {tabs.map((tab) => (
        <button
          key={tab.label}
          className={`relative px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap
            ${activeTab === tab.label
              ? "bg-neon-pink/10 text-neon-pink shadow-sm"
              : "text-stone-500 hover:text-neon-pink hover:bg-neon-pink/5"
            }`}
          onClick={() => setActiveTab(tab.label)}
        >
          <span className='relative z-10'>
            {tab.label}
            {activeTab === tab.label && (
              <div className='absolute inset-0 bg-gradient-to-r from-neon-pink/10 to-neon-cyan/10 rounded-xl' />
            )}
          </span>
        </button>
      ))}
    </div>
  )
}

export default Tabs