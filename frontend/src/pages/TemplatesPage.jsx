import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import PageTransition from '../components/PageTransition';
import { LayoutTemplate, Search } from 'lucide-react';
import ThemeSelector from '../components/ThemeSelector';
import { DUMMY_RESUME_DATA } from '../utils/data';

const TemplatesPage = () => {
  return (
    <DashboardLayout>
      <PageTransition>
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-app-border shadow-sm">
            <div>
              <h1 className="text-2xl font-extrabold text-text-main tracking-tight mb-1">Templates Gallery</h1>
              <p className="text-text-muted text-sm font-medium">Browse our collection of ATS-optimized templates</p>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
              <input 
                type="text" 
                placeholder="Search templates..." 
                className="form-input pl-10 py-2.5 w-full sm:w-64 bg-app-bg"
              />
            </div>
          </div>
          
          <div className="bg-white rounded-2xl border border-app-border p-6 shadow-sm">
            <ThemeSelector 
              selectedTheme="template1" 
              setSelectedTheme={() => {}} 
              onClose={() => {}} 
              resumeData={DUMMY_RESUME_DATA} 
            />
          </div>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
};

export default TemplatesPage;
