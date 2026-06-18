import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';

const AboutPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen flex flex-col bg-app-bg text-text-main font-sans selection:bg-primary/20">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20">
        <PageTransition>
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-text-main mb-4">Our Mission</h1>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">We believe everyone deserves a fair shot at their dream job. We're building the tools to level the playing field.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">The Story</h2>
              <p className="text-text-muted leading-relaxed">CVPilot was founded in 2024 after our team noticed how many incredibly talented professionals were being automatically rejected by Applicant Tracking Systems for minor formatting errors.</p>
              <p className="text-text-muted leading-relaxed">We set out to build a platform that doesn't just create pretty resumes, but creates resumes engineered to pass through modern recruiting software seamlessly.</p>
            </div>
            <div className="bg-primary/10 rounded-3xl h-[400px] border border-primary/20 flex items-center justify-center">
               <span className="text-primary font-bold text-xl opacity-50">Team Photo Placeholder</span>
            </div>
          </div>
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
};
export default AboutPage;
