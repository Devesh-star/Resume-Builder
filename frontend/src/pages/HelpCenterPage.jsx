import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';
import { Search, Book, MessageCircle, FileQuestion } from 'lucide-react';

const HelpCenterPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const categories = [
    { icon: <Book />, title: "Getting Started", desc: "Learn the basics of creating your first resume." },
    { icon: <FileQuestion />, title: "Billing & Subscriptions", desc: "Manage your premium plan and payment methods." },
    { icon: <MessageCircle />, title: "Troubleshooting", desc: "Fix common export and rendering issues." },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-app-bg text-text-main font-sans selection:bg-primary/20">
      <Navbar />
      <main className="flex-1 w-full flex flex-col">
        <PageTransition>
          {/* Header */}
          <div className="bg-primary pt-24 pb-32 px-4 text-center">
            <h1 className="text-4xl font-extrabold text-white mb-8">How can we help you?</h1>
            <div className="max-w-2xl mx-auto relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                <Search size={20} />
              </div>
              <input 
                type="text" 
                placeholder="Search for articles, guides, or topics..." 
                className="w-full pl-12 pr-4 py-4 rounded-xl shadow-lg border-0 focus:ring-4 focus:ring-white/20 outline-none text-lg"
              />
            </div>
          </div>
          
          {/* Content */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 pb-20 w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categories.map((cat, i) => (
                <div key={i} className="bg-white rounded-2xl border border-app-border p-8 shadow-lg hover:-translate-y-1 transition-transform cursor-pointer">
                  <div className="w-12 h-12 bg-secondary text-primary rounded-xl flex items-center justify-center mb-6">
                    {cat.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{cat.title}</h3>
                  <p className="text-text-muted">{cat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
};
export default HelpCenterPage;
