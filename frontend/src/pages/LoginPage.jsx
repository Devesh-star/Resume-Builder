import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../components/Login';
import PageTransition from '../components/PageTransition';
import { ArrowLeft } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="min-h-screen bg-app-bg flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 inset-x-0 h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-secondary/50 blur-3xl" />
        </div>

        <div className="absolute top-6 left-6">
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center gap-2 text-sm font-medium text-text-muted hover:text-text-main transition-colors"
          >
            <ArrowLeft size={16} /> Back to Home
          </button>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-app-border">
            <Login 
              setCurrentPage={(page) => navigate(page === 'signup' ? '/signup' : '/login')} 
              onLoginSuccess={() => navigate('/dashboard')} 
            />
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default LoginPage;
