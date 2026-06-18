import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';
import { Mail, MapPin, Phone } from 'lucide-react';

const ContactPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen flex flex-col bg-app-bg text-text-main font-sans selection:bg-primary/20">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20">
        <PageTransition>
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-text-main mb-4">Get in Touch</h1>
            <p className="text-lg text-text-muted">Have a question or want to work together? We'd love to hear from you.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-10">
              <h2 className="text-2xl font-bold">Contact Information</h2>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary text-primary flex items-center justify-center shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-text-main">Email Support</h4>
                  <p className="text-text-muted">support@cvpilot.com</p>
                  <p className="text-sm text-text-muted mt-1">We aim to reply within 24 hours.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary text-primary flex items-center justify-center shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-text-main">Office Address</h4>
                  <p className="text-text-muted">123 Tech Boulevard<br/>San Francisco, CA 94105</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl border border-app-border p-8 shadow-sm">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-bold text-text-main mb-2">Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-app-border focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-text-main mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl border border-app-border focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-text-main mb-2">Message</label>
                  <textarea rows="4" className="w-full px-4 py-3 rounded-xl border border-app-border focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none" placeholder="How can we help you?"></textarea>
                </div>
                <button type="button" className="btn-primary w-full justify-center">Send Message</button>
              </form>
            </div>
          </div>
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
};
export default ContactPage;
