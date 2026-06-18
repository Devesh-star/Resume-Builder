import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';

const TermsOfServicePage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen flex flex-col bg-app-bg text-text-main font-sans selection:bg-primary/20">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20">
        <PageTransition>
          <div className="bg-white rounded-3xl border border-app-border p-8 md:p-12 shadow-sm prose prose-lg max-w-none text-text-muted">
            <h1 className="text-4xl font-extrabold text-text-main mb-2">Terms of Service</h1>
            <p className="text-sm font-medium mb-12">Last Updated: October 1, 2026</p>

            <h2 className="text-2xl font-bold text-text-main mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-6">By accessing and using CVPilot ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.</p>

            <h2 className="text-2xl font-bold text-text-main mt-8 mb-4">2. User Accounts</h2>
            <p className="mb-6">You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account. We are not liable for any loss or damage arising from your failure to protect your login information.</p>

            <h2 className="text-2xl font-bold text-text-main mt-8 mb-4">3. Acceptable Use</h2>
            <p className="mb-6">You agree not to use the Service to upload false, misleading, or malicious content. The Service is intended for personal, non-commercial use to create resumes and career documents.</p>

            <h2 className="text-2xl font-bold text-text-main mt-8 mb-4">4. Subscription and Billing</h2>
            <p className="mb-6">Premium features require a paid subscription. Subscriptions automatically renew unless canceled at least 24 hours before the end of the current billing cycle. Refunds are provided only according to our refund policy.</p>
          </div>
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
};
export default TermsOfServicePage;
