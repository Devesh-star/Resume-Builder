import React from 'react'

const Tabs = ({ tabs = [], activeTab, setActiveTab }) => {
  return (
    <div className='flex bg-app-surface p-1 rounded-2xl border border-stone-200 shadow-sm'>
      {tabs.map((tab) => (
        <button
          key={tab.label}
          className={`relative px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap
            ${activeTab === tab.label
              ? "bg-primary/10 text-primary shadow-sm"
              : "text-indigo-400 hover:text-primary hover:bg-primary/5"
            }`}
          onClick={() => setActiveTab(tab.label)}
        >
          <span className='relative z-10'>
            {tab.label}
            {activeTab === tab.label && (
              <div className='absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl' />
            )}
          </span>
        </button>
      ))}
    </div>
  )
}

export default Tabs