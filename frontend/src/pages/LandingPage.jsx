import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { ArrowRight, LayoutTemplate, Zap, Download, FileText, CheckCircle, Star, Target, ShieldCheck, PenTool, LayoutGrid, FileSearch } from "lucide-react";
import { UserContext } from "../components/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import Login from "../components/Login";
import SignUp from "../components/SignUp";

// Note: Replace these with actual images or new minimal vector graphics later if needed
const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  React.useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        // Add a slight delay to ensure rendering is complete
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, [location]);

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  const handleATSClick = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/ats-reports");
    }
  };

  const handleTemplatesClick = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/templates");
    }
  };

  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen bg-app-bg text-text-main font-sans selection:bg-primary/20">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 inset-x-0 h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-secondary/50 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-start"
            >
              
              <h1 className="text-5xl sm:text-6xl lg:text-[64px] font-extrabold leading-[1.1] tracking-tight mb-6 text-text-main">
                Build a Resume That <br className="hidden sm:block" />
                <span className="text-primary">Gets Interviews.</span>
              </h1>
              
              <p className="text-lg text-text-muted mb-8 max-w-lg leading-relaxed">
                Create ATS-friendly resumes, tailor them for every job, and download professional PDFs in minutes. No design skills required.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10">
                <button onClick={handleCTA} className="btn-primary w-full sm:w-auto text-base px-8 py-3.5">
                  Build Resume Free
                </button>
                <a href="#templates" className="btn-outline w-full sm:w-auto text-base px-8 py-3.5">
                  View Templates
                </a>
              </div>

              {/* Trust Row */}
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-text-muted font-medium">
                <div className="flex items-center gap-1.5"><Star size={16} className="text-warning fill-warning" /> 4.9/5 Rating</div>
                <div className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-success" /> ATS Optimized</div>
                <div className="flex items-center gap-1.5"><Download size={16} className="text-text-main" /> PDF Export</div>
              </div>
            </motion.div>

            {/* Right Interactive Mockup */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative lg:h-[600px] flex justify-center items-center perspective-1000"
            >
              <div className="relative w-full max-w-md aspect-[1/1.4] bg-white rounded-2xl shadow-2xl border border-app-border overflow-hidden">
                {/* Mock Resume UI Header */}
                <div className="h-12 border-b border-app-border bg-app-elevated flex items-center px-4 justify-between">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-error/80" />
                    <div className="w-3 h-3 rounded-full bg-warning/80" />
                    <div className="w-3 h-3 rounded-full bg-success/80" />
                  </div>
                  <div className="text-xs font-semibold text-text-muted">Software_Engineer_CV.pdf</div>
                  <div className="w-4" /> {/* Spacer */}
                </div>
                {/* Mock Resume Body */}
                <div className="p-8 space-y-6 opacity-70">
                  <div className="space-y-2">
                    <div className="h-6 bg-app-border rounded w-1/2" />
                    <div className="h-3 bg-app-border/50 rounded w-1/3" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-app-border rounded w-full" />
                    <div className="h-4 bg-app-border rounded w-full" />
                    <div className="h-4 bg-app-border rounded w-3/4" />
                  </div>
                  <div className="space-y-4 pt-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="space-y-2">
                        <div className="h-4 bg-app-border rounded w-1/3" />
                        <div className="h-3 bg-app-border/50 rounded w-full" />
                        <div className="h-3 bg-app-border/50 rounded w-5/6" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating ATS Score Card */}
                <div className="absolute bottom-6 right-6 bg-white p-4 rounded-xl shadow-lg border border-app-border w-48 animate-slide-up" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-text-muted uppercase">ATS Match</span>
                    <span className="text-success font-bold">92%</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div className="bg-success h-full rounded-full w-[92%]" />
                  </div>
                  <p className="text-[10px] text-text-muted mt-2">Looks great! High chance of passing screeners.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. SOCIAL PROOF */}
      <section className="py-12 border-y border-app-border bg-app-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold text-text-muted uppercase tracking-widest mb-8">Trusted by professionals worldwide</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale">
             {/* Mock Company Logos - Using text for now, should be SVGs */}
             <div className="text-xl font-bold font-mono">Microsoft</div>
             <div className="text-xl font-bold font-mono">Google</div>
             <div className="text-xl font-bold font-mono">Amazon</div>
             <div className="text-xl font-bold font-mono">Meta</div>
             <div className="text-xl font-bold font-mono">Netflix</div>
          </div>
        </div>
      </section>

      {/* 3. FEATURES */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-main mb-4">Everything you need to stand out</h2>
            <p className="text-lg text-text-muted">CVPilot provides enterprise-grade tools to craft the perfect resume, optimized for humans and robots alike.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <PenTool />, title: "AI Resume Writing", desc: "Generate professional summaries and bullet points instantly." },
              { icon: <Target />, title: "ATS Checker", desc: "Identify missing keywords and fix formatting issues before applying." },
              { icon: <LayoutGrid />, title: "Multiple Templates", desc: "Choose from battle-tested, recruiter-approved layouts." },
              { icon: <CheckCircle />, title: "Resume Scoring", desc: "Get actionable feedback to improve your resume's impact." },
              { icon: <Download />, title: "PDF Export", desc: "One-click export to pixel-perfect PDFs." },
              { icon: <FileSearch />, title: "Job-Specific Tailoring", desc: "Duplicate and customize resumes for specific job descriptions." }
            ].map((feature, idx) => (
              <motion.div key={idx} {...fadeUp} transition={{ delay: idx * 0.1 }} className="card p-6">
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-primary mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-text-main mb-2">{feature.title}</h3>
                <p className="text-text-muted leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="py-24 bg-app-surface border-y border-app-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-main">3 Steps to Hired</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-app-border -z-10" />
            
            {[
              { step: "01", title: "Create", desc: "Fill in your details or import from LinkedIn to build your profile." },
              { step: "02", title: "Customize", desc: "Select a professional template and let our ATS checker guide you." },
              { step: "03", title: "Download", desc: "Export as a high-quality PDF and start applying with confidence." }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center bg-white p-8 rounded-2xl border border-app-border shadow-sm relative">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-lg font-bold mb-6 ring-4 ring-white">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-text-main mb-3">{item.title}</h3>
                <p className="text-text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MASSIVE TEMPLATES HERO SECTION */}
      <section id="templates" className="py-32 bg-primary relative overflow-hidden">
        {/* Abstract Background for Templates Hero */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xNSIvPjwvc3ZnPg==')] opacity-40" />
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Informative Text */}
            <motion.div {...fadeUp}>
              <div className="inline-flex items-center gap-2 bg-violet-500 text-white px-4 py-2 rounded-full mb-6 font-bold text-sm shadow-md">
                <LayoutTemplate size={16} />
                Template Library
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
                Stand Out With <br />
                <span className="text-yellow-300">Recruiter-Approved</span> Designs
              </h2>
              <p className="text-lg text-white mb-8 leading-relaxed max-w-lg font-medium">
                We've partnered with hiring managers from top tech companies to design templates that balance beautiful aesthetics with rigid ATS-parsing rules.
              </p>
              
              <ul className="space-y-5 mb-10">
                {[
                  "7 Unique Layouts (From Classic to Modern Tech)",
                  "Dynamically scales to fit your content perfectly",
                  "Built-in margins engineered for ATS parsers",
                  "One-click theme switching without losing data"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="bg-white/20 rounded-full p-1 mt-0.5">
                      <CheckCircle className="text-yellow-300 shrink-0" size={18} />
                    </div>
                    <span className="text-white font-semibold text-lg">{item}</span>
                  </li>
                ))}
              </ul>

              <button onClick={handleTemplatesClick} className="bg-white text-primary hover:bg-gray-50 font-extrabold px-8 py-4 rounded-xl shadow-2xl transition-all text-lg flex items-center gap-3 group">
                Explore All Templates <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
            
            {/* Visual Graphic */}
            <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                {/* Abstract stacked cards graphic */}
                <div className="absolute inset-0 bg-violet-700 rounded-2xl transform rotate-6 translate-x-4 translate-y-4 shadow-xl" />
                <div className="absolute inset-0 bg-violet-500 rounded-2xl transform rotate-3 translate-x-2 translate-y-2 shadow-xl" />
                
                <div className="relative bg-white rounded-2xl shadow-2xl border border-app-border p-10 text-center flex flex-col items-center justify-center min-h-[400px]">
                  <div className="w-20 h-20 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                    <LayoutTemplate size={40} />
                  </div>
                  <h3 className="text-3xl font-extrabold text-gray-900 mb-4">Find Your Perfect Fit</h3>
                  <p className="text-gray-700 font-medium mb-10 text-lg leading-relaxed">Stop worrying about formatting and margins. Focus on your content, and let our templates do the heavy lifting.</p>
                  <button onClick={handleTemplatesClick} className="btn-primary w-full text-lg py-4 shadow-lg hover:shadow-xl">
                    Browse Gallery
                  </button>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 5. ATS EXPLANATION */}
      <section id="ats" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp}>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-text-main mb-6">Beat the Applicant Tracking Systems (ATS)</h2>
              <p className="text-lg text-text-muted mb-6">
                Over 75% of resumes are rejected before a human even sees them. Our built-in ATS checker analyzes your resume against industry standards to ensure you pass the initial screen.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Keyword optimization suggestions",
                  "Formatting analysis to prevent parsing errors",
                  "Section completeness validation",
                  "Action verb recommendations"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="text-primary shrink-0 mt-0.5" size={20} />
                    <span className="text-text-main font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <button onClick={handleATSClick} className="btn-secondary">Try the ATS Checker</button>
            </motion.div>
            
            <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="bg-app-surface border border-app-border p-6 rounded-2xl shadow-lg relative">
               <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-app-border pb-4">
                    <div>
                      <h4 className="font-bold text-text-main">ATS Score Breakdown</h4>
                      <p className="text-sm text-text-muted">Based on 15+ data points</p>
                    </div>
                    <div className="text-3xl font-extrabold text-success">85/100</div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-main font-medium">Keywords Found</span>
                      <span className="text-success font-bold">12/15</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full"><div className="bg-success h-full rounded-full w-4/5" /></div>
                    
                    <div className="flex justify-between text-sm pt-2">
                      <span className="text-text-main font-medium">Formatting</span>
                      <span className="text-success font-bold">Perfect</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full"><div className="bg-success h-full rounded-full w-full" /></div>
                    
                    <div className="flex justify-between text-sm pt-2">
                      <span className="text-text-main font-medium">Action Verbs</span>
                      <span className="text-warning font-bold">Needs Work</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full"><div className="bg-warning h-full rounded-full w-1/2" /></div>
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. CTA / FOOTER */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-30" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">Ready to land your dream job?</h2>
          <p className="text-primary-hover text-lg mb-10 text-white/80">Join thousands of professionals who trust CVPilot to build their resumes.</p>
          <button onClick={handleCTA} className="bg-white text-primary hover:bg-gray-50 font-bold px-8 py-4 rounded-xl shadow-lg transition-all text-lg">
            Create Resume For Free
          </button>
        </div>
      </section>

      <Footer />

      {/* Auth Modal */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
        maxWidth="max-w-[400px]"
      >
        <div className="p-2">
          {currentPage === "login" && (
            <Login setCurrentPage={setCurrentPage} onLoginSuccess={() => setOpenAuthModal(false)} />
          )}
          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default LandingPage;
