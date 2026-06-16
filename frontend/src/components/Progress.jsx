import React from 'react'

const Progress = ({progress = 0, total = 5, color, bgColor}) => {
  return (
    <div className='flex gap-1.5 '>
      {[...Array(total)].map((_, index) => (
        <div key={index}
        className={`w-2 h-2 rounded transition-all ${index < progress ? "bg-neon-pink" : "bg-neon-pink/20"
        }`}
        style={{
            backgroundColor:
            index < progress
            ? color || undefined
            : bgColor || undefined
        }}>

        </div>
      ))}
    </div>
  )
}

export default Progress
