import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';

const BlogPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  
  const posts = [
    { title: "10 Action Verbs to Supercharge Your Resume", date: "Oct 12, 2026", category: "Tips" },
    { title: "How to Answer 'What is Your Greatest Weakness?'", date: "Sep 28, 2026", category: "Interviews" },
    { title: "The Anatomy of an ATS-Friendly Resume format", date: "Sep 15, 2026", category: "Guides" },
    { title: "Negotiating Your Salary Like a Pro", date: "Aug 30, 2026", category: "Career" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-app-bg text-text-main font-sans selection:bg-primary/20">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20">
        <PageTransition>
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-text-main mb-4">Career Blog</h1>
            <p className="text-lg text-text-muted">Expert advice on interviews, career growth, and job hunting.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post, i) => (
              <div key={i} className="bg-white rounded-2xl border border-app-border overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group">
                <div className="h-48 bg-secondary w-full group-hover:bg-primary/20 transition-colors" />
                <div className="p-8">
                  <div className="flex items-center gap-3 text-sm text-text-muted mb-3">
                    <span className="font-semibold text-primary">{post.category}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                  <p className="text-text-muted line-clamp-2">Learn the best practices and insider secrets to optimize your career trajectory and stand out to recruiters in today's competitive job market.</p>
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
export default BlogPage;
