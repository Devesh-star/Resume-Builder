import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';

const PrivacyPolicyPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen flex flex-col bg-app-bg text-text-main font-sans selection:bg-primary/20">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20">
        <PageTransition>
          <div className="bg-white rounded-3xl border border-app-border p-8 md:p-12 shadow-sm prose prose-lg max-w-none text-text-muted">
            <h1 className="text-4xl font-extrabold text-text-main mb-2">Privacy Policy</h1>
            <p className="text-sm font-medium mb-12">Last Updated: October 1, 2026</p>

            <h2 className="text-2xl font-bold text-text-main mt-8 mb-4">1. Information We Collect</h2>
            <p className="mb-6">We collect information you provide directly to us when you create an account, use our resume builder, or contact customer support. This includes your name, email address, employment history, and any other data you input into your resume profiles.</p>

            <h2 className="text-2xl font-bold text-text-main mt-8 mb-4">2. How We Use Your Data</h2>
            <p className="mb-6">We use the information we collect to provide, maintain, and improve our services. Specifically, we use your data to generate PDF resumes, analyze your content against ATS standards, and communicate with you regarding your account.</p>

            <h2 className="text-2xl font-bold text-text-main mt-8 mb-4">3. Data Security</h2>
            <p className="mb-6">We implement industry-standard security measures to protect your personal information. Your resume data is encrypted in transit and at rest. We do not sell your personal data to third parties.</p>

            <h2 className="text-2xl font-bold text-text-main mt-8 mb-4">4. Your Rights</h2>
            <p className="mb-6">You have the right to access, update, or delete your personal information at any time. You can export your data or delete your account entirely from the Settings page.</p>
          </div>
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
};
export default PrivacyPolicyPage;
