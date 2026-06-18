import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';

const FAQPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  
  const faqs = [
    { q: "Is CVPilot completely free to use?", a: "We offer a generous free tier that allows you to create, edit, and export a basic resume. Premium templates and advanced ATS features require a subscription." },
    { q: "How does the ATS Checker work?", a: "Our proprietary algorithm scans your resume against thousands of real-world job descriptions to ensure your keywords and formatting are perfectly aligned with what robots look for." },
    { q: "Can I download my resume as a PDF?", a: "Absolutely. All resumes built on CVPilot can be exported as high-resolution, perfectly formatted PDFs with a single click." },
    { q: "Do you offer refunds for the premium plan?", a: "Yes, we offer a 14-day money-back guarantee if you are not completely satisfied with our premium resume templates and features." },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-app-bg text-text-main font-sans selection:bg-primary/20">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20">
        <PageTransition>
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-text-main mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-text-muted">Everything you need to know about the product and billing.</p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-app-border p-8 shadow-sm">
                <h3 className="text-lg font-bold mb-3">{faq.q}</h3>
                <p className="text-text-muted leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
};
export default FAQPage;
