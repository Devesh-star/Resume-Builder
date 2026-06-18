import React from 'react';
import { motion } from 'framer-motion';
import { User, CheckCircle, Sparkles } from 'lucide-react';

const HeroShowcase = () => {
  // Common spring animation for floating
  const floatAnim = {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const reverseFloatAnim = {
    y: [0, 10, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] flex items-center justify-center perspective-[1000px]">

      {/* Main Glass Card */}
      <motion.div
        initial={{ opacity: 0, rotateY: -10, rotateX: 10, y: 20 }}
        animate={{ opacity: 1, rotateY: 0, rotateX: 5, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="w-full max-w-[400px] bg-slate-200/50 backdrop-blur-2xl border border-slate-300 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10"
        style={{
          boxShadow: '0 30px 60px -15px rgba(216, 56, 107, 0.2)'
        }}
      >
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center pb-6 mb-6 border-b border-slate-300 relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#4338CA] to-[#ff4d85] p-1 mb-4 shadow-[0_0_15px_rgba(216,56,107,0.5)]">
            <div className="w-full h-full rounded-full bg-app-surface flex items-center justify-center">
              <User className="text-white" size={32} />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">Devesh Malik</h3>
          <p className="text-sm text-indigo-500 font-medium">Software Engineer</p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <span className="text-[10px] font-bold tracking-wider uppercase bg-[#4338CA]/20 text-pink-300 px-3 py-1 rounded-full border border-[#4338CA]/30">React</span>
            <span className="text-[10px] font-bold tracking-wider uppercase bg-[#4338CA]/20 text-pink-300 px-3 py-1 rounded-full border border-[#4338CA]/30">Node.js</span>
            <span className="text-[10px] font-bold tracking-wider uppercase bg-[#4338CA]/20 text-pink-300 px-3 py-1 rounded-full border border-[#4338CA]/30">MongoDB</span>
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-6">
          <h4 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-3">Education</h4>
          <div className="flex justify-between items-baseline">
            <span className="text-sm font-semibold text-indigo-500">B.Tech in Computer Science</span>
            <span className="text-xs text-indigo-400">2023 - 2027</span>
          </div>
        </div>

        {/* Experience Section */}
        <div>
          <h4 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-3">Experience</h4>
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-sm font-bold text-indigo-500">Full Stack Developer</span>
            <span className="text-xs font-semibold text-[#4338CA]">2024 - Present</span>
          </div>
          <p className="text-xs text-indigo-500 leading-relaxed border-l-2 border-slate-300 pl-3">
            Developed a comprehensive Resume Builder.<br />
            Implemented robust MERN stack architecture.
          </p>
        </div>
      </motion.div>

      {/* Floating ATS Badge (Top Left) */}
      <motion.div
        animate={floatAnim}
        className="absolute top-4 left-0 sm:left-4 z-20 bg-black/80 backdrop-blur-md border border-[#4338CA]/30 p-4 rounded-2xl flex items-center gap-3 shadow-[0_10px_30px_rgba(216,56,107,0.2)]"
      >
        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
          <CheckCircle className="text-emerald-400" size={16} />
        </div>
        <div>
          <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider">ATS Score</p>
          <p className="text-emerald-400 font-bold text-lg leading-tight">83%</p>
        </div>
      </motion.div>

      {/* Floating AI Badge (Bottom Right) */}
      <motion.div
        animate={reverseFloatAnim}
        className="absolute bottom-10 right-0 sm:-right-6 z-20 bg-black/80 backdrop-blur-md border border-emerald-500/30 p-4 rounded-2xl flex items-center gap-3 shadow-[0_10px_30px_rgba(16,185,129,0.15)]"
      >
        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
          <Sparkles className="text-emerald-400" size={20} />
        </div>
        <div>
          <p className="text-emerald-400 font-bold text-sm leading-tight">AI Optimization</p>
          <p className="text-[10px] font-medium text-indigo-500">Smart keyword matching</p>
        </div>
      </motion.div>

    </div>
  );
};

export default HeroShowcase;
