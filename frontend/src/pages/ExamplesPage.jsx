import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';
import { FileText } from 'lucide-react';

const ExamplesPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  
  const examples = [
    { title: "Software Engineer", role: "Tech", match: "95%" },
    { title: "Marketing Manager", role: "Marketing", match: "92%" },
    { title: "Financial Analyst", role: "Finance", match: "89%" },
    { title: "Product Designer", role: "Design", match: "98%" },
    { title: "Sales Executive", role: "Sales", match: "85%" },
    { title: "Operations Director", role: "Management", match: "91%" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-app-bg text-text-main font-sans selection:bg-primary/20">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20">
        <PageTransition>
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-text-main mb-4">Resume Examples by Industry</h1>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">Browse through our collection of ATS-friendly resume examples that have successfully landed jobs at top tech companies.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {examples.map((ex, i) => (
              <div key={i} className="bg-white rounded-2xl border border-app-border p-6 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                <div className="w-12 h-12 bg-secondary text-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FileText size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">{ex.title}</h3>
                <div className="flex justify-between text-sm text-text-muted mt-4">
                  <span className="bg-app-bg px-2 py-1 rounded-md">{ex.role}</span>
                  <span className="text-success font-semibold">ATS: {ex.match}</span>
                </div>
              </div>
            ))}
          </div>
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
};
export default ExamplesPage;
