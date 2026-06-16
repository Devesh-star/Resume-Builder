/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, LayoutTemplate, Menu, X, Zap, Download, FileText, Sparkles, Shield } from "lucide-react";
import { useContext } from "react";
import { UserContext } from "../components/UserContext";
import { useNavigate } from "react-router-dom";
import { ProfileInfoCard } from "../components/Cards";
import Modal from "../components/Modal";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import PageTransition from "../components/PageTransition";
import HeroShowcase from "../components/HeroShowcase";

import Resume1 from "../assets/Resume1.png";
import Resume3 from "../assets/Resume3.png";

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setmobileMenuOpen] = useState(false);
  const [openAuthModal, setopenAuthModal] = useState(false);
  const [currentPage, setcurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) {
      setopenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen text-stone-200 font-sans">
        {/* Header */}
        <header className="fixed top-0 w-full z-50 bg-[#0a0508]/90 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#d8386b] rounded-lg flex items-center justify-center">
                <FileText size={18} className="text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                CV<span className="text-[#d8386b]">Pilot</span>
              </span>
            </div>

            <button
              className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
              onClick={() => setmobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X size={22} className="text-stone-300" />
              ) : (
                <Menu size={22} className="text-stone-300" />
              )}
            </button>

            <div className="hidden md:flex items-center gap-5">
              {!user && (
                <button
                  className="text-sm font-medium text-stone-400 hover:text-white transition-colors"
                  onClick={() => setopenAuthModal(true)}
                >
                  Login
                </button>
              )}
              {user ? (
                <ProfileInfoCard />
              ) : (
                <button
                  className="bg-[#d8386b] hover:bg-[#c02e5c] text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
                  onClick={() => setopenAuthModal(true)}
                >
                  Get Started
                </button>
              )}
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden bg-[#0a0508]/95 backdrop-blur-xl border-b border-white/5 px-4 py-4">
              {user ? (
                <button
                  className="w-full bg-[#d8386b] text-white py-3 rounded-lg font-semibold"
                  onClick={() => {
                    navigate("/dashboard");
                    setmobileMenuOpen(false);
                  }}
                >
                  Go to Dashboard
                </button>
              ) : (
                <button
                  className="w-full bg-[#d8386b] text-white py-3 rounded-lg font-semibold"
                  onClick={() => {
                    setopenAuthModal(true);
                    setmobileMenuOpen(false);
                  }}
                >
                  Get Started
                </button>
              )}
            </div>
          )}
        </header>

        {/* Hero */}
        <main className="relative z-10 pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <section className="min-h-[calc(100vh-200px)] flex flex-col justify-center mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left */}
              <div className="flex flex-col items-start text-left">
                <div className="inline-flex items-center gap-2 bg-[#d8386b]/10 border border-[#d8386b]/20 px-3 py-1.5 rounded-full mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#d8386b]"></div>
                  <span className="text-xs font-semibold tracking-wide text-[#d8386b] uppercase">
                    Professional Resume Builder
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-6">
                  Build a Resume{" "}
                  <br />
                  <span className="text-[#d8386b]">
                    That Gets You Hired
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-stone-400 leading-relaxed mb-8 max-w-lg">
                  Create professional, ATS-friendly resumes with beautiful
                  templates. Stand out from the competition and land more
                  interviews.
                </p>

                <div className="flex flex-wrap items-center gap-3 mb-10">
                  <button
                    className="bg-[#d8386b] hover:bg-[#c02e5c] text-white px-7 py-3 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
                    onClick={handleCTA}
                  >
                    Start Building Free
                    <ArrowRight size={16} />
                  </button>
                  <button
                    className="border border-white/15 hover:border-white/30 text-stone-300 hover:text-white px-7 py-3 rounded-lg text-sm font-semibold transition-colors"
                    onClick={handleCTA}
                  >
                    See Templates
                  </button>
                </div>

                <div className="flex items-center gap-6 text-sm text-stone-500">
                  <div className="flex items-center gap-1.5">
                    <Shield size={14} className="text-stone-500" />
                    <span>Free to use</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Download size={14} className="text-stone-500" />
                    <span>PDF Export</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Sparkles size={14} className="text-stone-500" />
                    <span>5+ Templates</span>
                  </div>
                </div>
              </div>

              {/* Right — Animated Hero Showcase */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="hidden lg:flex justify-center items-center"
              >
                <HeroShowcase />
              </motion.div>
            </div>
          </section>

          {/* Features */}
          <section className="py-16 border-t border-white/5">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-14">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
                  Why Choose <span className="text-[#d8386b]">CVPilot?</span>
                </h2>
                <p className="text-stone-400 text-base max-w-xl mx-auto">
                  Everything you need to create a professional resume that stands out
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: <Zap size={22} className="text-[#d8386b]" />,
                    title: "Lightning Fast",
                    description:
                      "Create professional resumes in under 5 minutes with our streamlined editor",
                  },
                  {
                    icon: <LayoutTemplate size={22} className="text-[#d8386b]" />,
                    title: "Pro Templates",
                    description:
                      "Choose from multiple recruiter-approved, ATS-friendly templates",
                  },
                  {
                    icon: <Download size={22} className="text-[#d8386b]" />,
                    title: "Instant Export",
                    description:
                      "Download high-quality PDFs instantly with perfect formatting",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white/[0.03] border border-white/[0.06] p-7 rounded-xl hover:bg-white/[0.05] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#d8386b]/10 flex items-center justify-center mb-5">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-stone-400 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white/[0.03] border border-white/[0.06] p-10 sm:p-14 rounded-2xl text-center"
              >
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                  Ready to Build Your{" "}
                  <span className="text-[#d8386b]">Resume?</span>
                </h2>
                <p className="text-stone-400 text-base mb-8 max-w-lg mx-auto">
                  Join professionals who landed their dream jobs with CVPilot
                </p>
                <button
                  className="bg-[#d8386b] hover:bg-[#c02e5c] text-white px-8 py-3.5 rounded-lg text-base font-semibold transition-colors"
                  onClick={handleCTA}
                >
                  Start Building Now
                </button>
              </motion.div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="w-full text-center py-6 border-t border-white/5">
          <p className="text-stone-500 text-sm">
            Crafted with <span className="text-[#d8386b]">♥</span> by Devesh Malik
          </p>
        </footer>

        {/* Auth Modal */}
        <Modal
          isOpen={openAuthModal}
          onClose={() => {
            setopenAuthModal(false);
            setcurrentPage("login");
          }}
          hideHeader
          maxWidth="max-w-[400px]"
        >
          <div>
            {currentPage === "login" && (
              <Login setCurrentPage={setcurrentPage} />
            )}
            {currentPage === "signup" && (
              <SignUp setCurrentPage={setcurrentPage} />
            )}
          </div>
        </Modal>
      </div>
    </PageTransition>
  );
};

export default LandingPage;
