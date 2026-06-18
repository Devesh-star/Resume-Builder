/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "../components/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { LucideFilePlus, LucideTrash, LucideTrash2, Plus } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { ResumeSummaryCard } from "../components/Cards";
import toast from "react-hot-toast";
import { differenceInDays } from "date-fns";
import Modal from "../components/Modal";
import CreateResumeForm from "../components/CreateResumeForm";
import PageTransition from "../components/PageTransition";

const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [allResumes, setAllResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resumeToDelete, setResumeToDelete] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const calculateCompletion = (resume) => {
    let completedFields = 0;
    let totalFields = 0;

    // Profile Info
    totalFields += 3;
    if (resume.profileInfo?.fullName) completedFields++;
    if (resume.profileInfo?.designation) completedFields++;
    if (resume.profileInfo?.summary) completedFields++;

    // Contact Info
    totalFields += 2;
    if (resume.contactInfo?.email) completedFields++;
    if (resume.contactInfo?.phone) completedFields++;

    // Work Experience
    resume.workExperience?.forEach((exp) => {
      totalFields += 5;
      if (exp.company) completedFields++;
      if (exp.role) completedFields++;
      if (exp.startDate) completedFields++;
      if (exp.endDate) completedFields++;
      if (exp.description) completedFields++;
    });

    // Education
    resume.education?.forEach((edu) => {
      totalFields += 4;
      if (edu.degree) completedFields++;
      if (edu.institution) completedFields++;
      if (edu.startDate) completedFields++;
      if (edu.endDate) completedFields++;
    });

    return totalFields === 0
      ? 0
      : Math.round((completedFields / totalFields) * 100);
  };

  const fetchAllResumes = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL);

      const resumeWithCompletion = response.data.map((resume) => ({
        ...resume,
        completion: calculateCompletion(resume),
      }));

      setAllResumes(resumeWithCompletion);
    } catch (error) {
      console.error("Error fetching resumes:", error);
      toast.error("Failed to load resumes");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllResumes();
  }, [fetchAllResumes]);

  const handleDeleteClick = (id) => {
    setResumeToDelete(id);
    setShowDeleteConfirm(true);
  };

  const handleDeleteResume = async () => {
    if(!resumeToDelete) return;

    try {
      await axiosInstance.delete(API_PATHS.RESUME.DELETE(resumeToDelete))
      toast.success('Resume deleted successfully')
      fetchAllResumes();
    } 
    catch (error) {
      console.error('Error deleting resume:',error);
      toast.error('Error deleting resume')
      fetchAllResumes()
    }
    finally {
      setResumeToDelete(null)
      setShowDeleteConfirm(false)
    }
  }

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-app-border shadow-sm">
            <div>
              <h1 className="text-2xl font-extrabold text-text-main tracking-tight mb-1">My Resumes</h1>
              <p className="text-text-muted text-sm font-medium">
                {allResumes.length > 0
                  ? `You have ${allResumes.length} resume${
                      allResumes.length !== 1 ? "s" : ""
                    }`
                  : "Start building your professional resume"}
              </p>
            </div>

            <button
              className="btn-primary flex items-center justify-center gap-2"
              onClick={() => setOpenCreateModal(true)}
            >
              <Plus size={18} />
              Create New
            </button>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-secondary border-t-primary rounded-full animate-spin"></div>
            </div>
          )}

          {/* Empty State */}
          {!loading && allResumes.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white border border-dashed border-app-border rounded-3xl">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
                <LucideFilePlus size={32} className="text-primary" />
              </div>

              <h3 className="text-2xl font-bold text-text-main mb-3">No Resumes Yet</h3>

              <p className="text-text-muted max-w-md mx-auto mb-8">
                You haven't created any resumes yet. Start creating professional
                resumes to land your dream job.
              </p>

              <button
                className="btn-primary flex items-center gap-2"
                onClick={() => setOpenCreateModal(true)}
              >
                Create Your First Resume
                <Plus size={18} />
              </button>
            </div>
          )}

          {/* Resume Grid */}
          {!loading && allResumes.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <div
                className="h-[360px] flex flex-col items-center justify-center bg-app-bg border-2 border-dashed border-app-border rounded-2xl cursor-pointer hover:border-primary hover:bg-secondary transition-all group"
                onClick={() => setOpenCreateModal(true)}
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm text-text-muted group-hover:text-primary group-hover:scale-110 transition-all mb-4">
                  <Plus size={32} />
                </div>
                <h3 className="font-bold text-text-main text-lg mb-1">Create New</h3>
                <p className="text-text-muted text-sm">Start from scratch</p>
              </div>

              {allResumes.map((resume, index) => (
                <motion.div
                  key={resume._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ResumeSummaryCard
                    imgUrl={resume.thumbnailLink} 
                    title={resume.title}
                    createdAt={resume.createdAt}
                    updatedAt={resume.updatedAt}
                    completion={resume.completion || 0}
                    isPremium={resume.isPremium}
                    isNew={
                      differenceInDays(
                        new Date(),
                        new Date(resume.createdAt)
                      ) < 7
                    }
                    onSelect={() => navigate(`/resume/${resume._id}`)}
                    onDelete={() => handleDeleteClick(resume._id)}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <Modal isOpen={openCreateModal} onClose={() => setOpenCreateModal(false)}
        title="Create New Resume" maxWidth='max-w-xl'>
          <div className="p-6">
            <CreateResumeForm onSuccess={() => {
              setOpenCreateModal(false);
              fetchAllResumes();
            }}/>
          </div>
        </Modal>

        <Modal isOpen={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)} title='Confirm Deletion' maxWidth='max-w-md'>
          <div className="p-6">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4">
                <LucideTrash2 size={32}/>
              </div>
              <h3 className="text-xl font-bold text-text-main mb-2">Delete Resume?</h3>
              <p className="text-text-muted">
                Are you sure you want to delete this resume? This action cannot be undone.
              </p>
            </div>
            
            <div className="flex items-center gap-3 w-full">
              <button 
                onClick={() => setShowDeleteConfirm(false)} 
                className="flex-1 px-4 py-2.5 rounded-xl font-semibold border border-app-border text-text-main hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleDeleteResume} 
                className="flex-1 px-4 py-2.5 rounded-xl font-semibold bg-red-500 hover:bg-red-600 text-white transition-colors"
              >
                Delete Resume
              </button>
            </div>
          </div>
        </Modal>
      </DashboardLayout>
    </PageTransition>
  );
};

export default Dashboard;
