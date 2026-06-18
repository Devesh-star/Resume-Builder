import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import PageTransition from '../components/PageTransition';
import { Target, FileText, CheckCircle, XCircle, Search, Loader2 } from 'lucide-react';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';
import toast from 'react-hot-toast';
import { calculateATSScore } from '../utils/atsScorer';

const ATSReportsPage = () => {
  const [resumes, setResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState(null);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL);
      if (response.data && response.data.success) {
        setResumes(response.data.data);
        if (response.data.data.length > 0) {
          setSelectedResumeId(response.data.data[0]._id);
        }
      }
    } catch (error) {
      toast.error("Failed to load resumes");
    }
  };

  const handleAnalyze = () => {
    if (!selectedResumeId) {
      toast.error("Please select a resume");
      return;
    }
    if (!jobDescription.trim()) {
      toast.error("Please paste a job description");
      return;
    }

    setIsLoading(true);
    setReport(null);
    
    // Simulate API delay for better UX
    setTimeout(() => {
      const selectedResume = resumes.find(r => r._id === selectedResumeId);
      if (selectedResume) {
        const result = calculateATSScore(selectedResume, jobDescription);
        setReport(result);
      }
      setIsLoading(false);
    }, 1200);
  };

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-app-border shadow-sm">
            <div>
              <h1 className="text-2xl font-extrabold text-text-main tracking-tight mb-1">ATS Scanner</h1>
              <p className="text-text-muted text-sm font-medium">Analyze your resume against job descriptions to boost your match rate.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Inputs */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-app-border shadow-sm">
                <h3 className="text-lg font-bold text-text-main mb-4 flex items-center gap-2">
                  <FileText size={18} className="text-primary" />
                  1. Select Resume
                </h3>
                {resumes.length === 0 ? (
                  <p className="text-sm text-text-muted italic bg-app-bg p-4 rounded-xl">No resumes found. Please create one first.</p>
                ) : (
                  <select 
                    value={selectedResumeId}
                    onChange={(e) => setSelectedResumeId(e.target.value)}
                    className="form-input w-full cursor-pointer bg-app-bg border-app-border"
                  >
                    {resumes.map(resume => (
                      <option key={resume._id} value={resume._id}>
                        {resume.title || 'Untitled Resume'}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="bg-white p-6 rounded-2xl border border-app-border shadow-sm">
                <h3 className="text-lg font-bold text-text-main mb-4 flex items-center gap-2">
                  <Search size={18} className="text-primary" />
                  2. Paste Job Description
                </h3>
                <textarea
                  className="form-input w-full min-h-[250px] resize-y bg-app-bg border-app-border placeholder:text-text-muted/60"
                  placeholder="Paste the full job description here. We'll extract the core keywords and compare them against your resume..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>

              <button 
                onClick={handleAnalyze} 
                disabled={isLoading || resumes.length === 0}
                className="btn-primary w-full py-4 text-base shadow-md font-bold"
              >
                {isLoading ? (
                  <><Loader2 size={20} className="animate-spin" /> Analyzing...</>
                ) : (
                  <><Target size={20} /> Scan Resume against JD</>
                )}
              </button>
            </div>

            {/* Right Column: Results */}
            <div className="lg:col-span-7">
              {!report && !isLoading && (
                <div className="h-full bg-white/50 border border-dashed border-app-border rounded-3xl flex flex-col items-center justify-center p-12 text-center min-h-[400px]">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <Target size={32} className="text-primary/40" />
                  </div>
                  <h3 className="text-xl font-bold text-text-muted mb-2">Ready to Scan</h3>
                  <p className="text-text-muted/80 max-w-sm">Select a resume and paste a job description on the left to see your ATS compatibility score.</p>
                </div>
              )}

              {isLoading && (
                <div className="h-full bg-white border border-app-border rounded-3xl shadow-sm flex flex-col items-center justify-center p-12 min-h-[400px]">
                  <Loader2 size={48} className="text-primary animate-spin mb-6" />
                  <h3 className="text-lg font-bold text-text-main mb-2">Simulating ATS Parsing...</h3>
                  <p className="text-text-muted text-sm">Extracting keywords, analyzing formatting, and checking action verbs.</p>
                </div>
              )}

              {report && !isLoading && (
                <div className="bg-white border border-app-border rounded-3xl shadow-sm overflow-hidden animate-fade-in">
                  
                  {/* Score Header */}
                  <div className={`p-8 text-center text-white ${report.score >= 80 ? 'bg-success' : report.score >= 60 ? 'bg-warning' : 'bg-error'}`}>
                     <p className="text-white/80 font-semibold uppercase tracking-wider text-sm mb-2">Overall Match Score</p>
                     <div className="text-6xl font-black mb-2">{report.score}%</div>
                     <p className="font-medium">
                       {report.score >= 80 ? 'Excellent match! You are highly likely to pass the ATS screen.' : 
                        report.score >= 60 ? 'Good start, but you should include more keywords from the JD.' : 
                        'Low match. Your resume needs significant tailoring for this role.'}
                     </p>
                  </div>

                  <div className="p-8 space-y-8">
                    
                    {/* Checklist */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-app-bg p-4 rounded-xl flex items-center gap-3">
                         <CheckCircle className="text-success shrink-0" size={24} />
                         <div>
                           <p className="text-sm font-bold text-text-main">ATS Formatting</p>
                           <p className="text-xs text-text-muted">Parsed successfully</p>
                         </div>
                      </div>
                      <div className="bg-app-bg p-4 rounded-xl flex items-center gap-3">
                         {report.actionVerbs === 'Needs Work' ? (
                           <XCircle className="text-error shrink-0" size={24} />
                         ) : (
                           <CheckCircle className={report.actionVerbs === 'Excellent' ? "text-success shrink-0" : "text-warning shrink-0"} size={24} />
                         )}
                         <div>
                           <p className="text-sm font-bold text-text-main">Action Verbs</p>
                           <p className="text-xs text-text-muted">{report.actionVerbs}</p>
                         </div>
                      </div>
                    </div>

                    {/* Keywords Section */}
                    <div>
                      <h4 className="font-bold text-text-main mb-4 flex items-center gap-2 border-b border-app-border pb-2">
                        Missing Keywords 
                        <span className="bg-error/10 text-error text-xs px-2 py-0.5 rounded-full">{report.missing.length}</span>
                      </h4>
                      {report.missing.length === 0 ? (
                        <p className="text-sm text-text-muted">You hit all the key terms!</p>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {report.missing.map((kw, i) => (
                            <span key={i} className="bg-error/10 text-error border border-error/20 px-3 py-1.5 rounded-lg text-sm font-medium">
                              {kw}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="font-bold text-text-main mb-4 flex items-center gap-2 border-b border-app-border pb-2">
                        Matched Keywords
                        <span className="bg-success/10 text-success text-xs px-2 py-0.5 rounded-full">{report.matched.length}</span>
                      </h4>
                      {report.matched.length === 0 ? (
                        <p className="text-sm text-text-muted">No key terms matched.</p>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {report.matched.map((kw, i) => (
                            <span key={i} className="bg-success/10 text-success border border-success/20 px-3 py-1.5 rounded-lg text-sm font-medium">
                              {kw}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default ATSReportsPage;
