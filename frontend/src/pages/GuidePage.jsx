import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';

const GuidePage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen flex flex-col bg-app-bg text-text-main font-sans selection:bg-primary/20">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20">
        <PageTransition>
          <h1 className="text-4xl font-extrabold text-text-main mb-6">How to Write a Resume in 2026</h1>
          <div className="flex items-center gap-4 text-sm text-text-muted mb-12 border-b border-app-border pb-8">
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">CP</div>
            <div>
              <p className="font-bold text-text-main">CVPilot Editorial Team</p>
              <p>Updated 2 weeks ago • 8 min read</p>
            </div>
          </div>
          
          <article className="prose prose-lg max-w-none text-text-muted space-y-6">
            <p className="text-xl leading-relaxed text-text-main font-medium">Crafting the perfect resume isn't about being the most creative designer; it's about being the clearest communicator. Here is our step-by-step guide.</p>
            
            <h2 className="text-2xl font-bold text-text-main mt-10 mb-4">1. Choose the Right Format</h2>
            <p>For 95% of job seekers, the reverse-chronological format is the way to go. This means listing your most recent experience first and working your way backwards. Recruiters prefer this format because it is easy to read.</p>
            
            <h2 className="text-2xl font-bold text-text-main mt-10 mb-4">2. Keep it to One Page</h2>
            <p>Unless you have over 10 years of highly relevant experience, stick to a single page. Hiring managers spend an average of 7 seconds scanning a resume.</p>

            <h2 className="text-2xl font-bold text-text-main mt-10 mb-4">3. Quantify Your Impact</h2>
            <p>Don't just list your responsibilities. Tell them what you achieved. Instead of "Managed a team," write "Managed a team of 5 and increased quarterly sales by 20%."</p>
            
            <div className="bg-secondary/50 p-6 rounded-xl border border-secondary mt-8 text-text-main font-medium">
              Pro Tip: Run your final draft through our built-in ATS checker to ensure you aren't missing any crucial keywords from the job description!
            </div>
          </article>
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
};
export default GuidePage;
