import React from 'react'
import { shimmerStyle } from '../assets/dummystyle'
import { Check } from 'react-feather'

const StepProgress = ({progress}) => {
  return (
    <>
      <style>{shimmerStyle}</style>
      <div className='relative w-full h-4 bg-slate-800/50 backdrop-blur-2xl overflow-hidden rounded-full border border-slate-700/30'>
        <div className='absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 animate-pulse'/>

        <div className='relative h-full bg-gradient-to-r from-cyan-500 via-violet-500 to-cyan-600 
        animate-flow bg-[length:200%_100%] transition-all duration-700 ease-out rounded-full overflow-hidden
        animate-pulse-glow' style={{width: `${progress}%`}}>
            <div className='absolue inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer'/>
            <div className='absolute inset-0 opacity-80'>
                {[...Array(8)].map((_,i) => (
                    <div key={i} className='absolut top-1/2 w-2 h-2 bg-white rounded-full animate-bubble shadow-lg'
                        style={{
                            left: `${(i+1) * 12}%`,
                            animationDelay: `${1 * 0.25}s`,

                        }}>
                    </div>
                ))}
            </div>

            <div className='absolut einset-0'>
                {[...Array(12)].map((_,i) => (
                    <div key={i} className='absolute w-1 h-1 bg-white rounded-full'
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`
                    }}>

                    </div>
                ))}
            </div>
        </div>

        {progress > 0 && (
            <div className='absolute top-0 h-full w-8 bg-gradient-to-r from-transparent via-white/40 to-white/20 blur-sm' style={{ left: `${Math.max(0,progress-4)}%`}}>
            </div>
        )}
      </div>

      <div className='flex justify-between items-center mt-3'>
        <div className='text-xs font-bold text-slate-500'>
            {progress < 25 
            ? "Getting Started"
            : progress < 50 
            ? " Making Progress"
            : progress < 75
            ? "Almost There"
            : "Nearly Completed"}
        </div>

        <div className='flex items-center gap-2'> 
            {progress === 100 && (
                <div className='w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20'>
                    <Check size={12} className='text-white'/>
                </div>
            )}
        </div>
      </div>
    </>
  )
}

export default StepProgress
{}