import React, { useCallback, useEffect, useRef, useState } from 'react'
import DashboardLayout from './DashboardLayout'
import { buttonStyles, containerStyles, iconStyles, statusStyles } from '../assets/dummystyle'
import { TitleInput } from './Inputs'
import { useNavigate, useParams } from 'react-router-dom'
import { set } from 'date-fns'
import { AlertCircle, ArrowLeft, Check, Download, Loader2, Palette, Trash, Trash2 } from 'lucide-react'
import axiosInstance from '../utils/axiosInstance'
import { API_PATHS } from '../utils/apiPaths'
import toast from 'react-hot-toast'
import { fixTailwindColors } from '../utils/colors'
import html2pdf from "html2pdf.js/dist/html2pdf.bundle.min.js";
import StepProgress from './StepProgress'
import {
  ProfileInfoForm,
  ContactInfoForm,
  WorkExperienceForm,
  EducationDetailsForm,
  SkillsInfoForm,
  ProjectDetailForm,
  CertificationInfoForm,
  LanguagesForm,
  InterestsForm,
  CustomSectionForm
} from './Forms'
import { Save } from 'react-feather'
import RenderResume from './RenderResume'
import ThemeSelector from './ThemeSelector'
import Modal from './Modal'
import html2canvas from "html2canvas"
import { dataURLtoFile } from '../utils/helper'
import { DUMMY_RESUME_DATA } from '../utils/data'
import PageTransition from './PageTransition'

const useResizeObserver = () => {
  const [size, setsize] = useState({ width: 0, height: 0 })
  const ref = useCallback((node) => {
    if (node) {
      const resizeObserver = new ResizeObserver((entries) => {
        const { width, height } = entries[0].contentRect;
        setsize({ width, height });
      })
      resizeObserver.observe(node)
    }
  }, [])
  return { ...size, ref }
}

const EditResume = () => {

  const { resumeId } = useParams()
  const navigate = useNavigate()
  const resumeDownloadRef = useRef(null)
  const thumbnailRef = useRef(null)

  const [openThemeSelector, setOpenThemeSelector] = useState(false)
  const [openPreviewModal, setOpenPreviewModal] = useState(false)
  const [currentPage, setCurrentPage] = useState("profile-info")
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadSuccess, setDownloadSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [completionPercentage, setCompletionPercentage] = useState(0)

  const { width: previewWidth, ref: previewContainerRef } = useResizeObserver();

  const [resumeData, setResumeData] = useState({
    title: "Professional Resume",
    thumbnailLink: "",
    profileInfo: {
      fullName: "",
      designation: "",
      summary: "",
    },
    template: {
      theme: "modern",
      colorPalette: []
    },
    contactInfo: {
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      website: "",
    },
    workExperience: [
      {
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    education: [
      {
        degree: "",
        institution: "",
        startDate: "",
        endDate: "",
      },
    ],
    skills: [
      {
        name: "",
        progress: 0,
      },
    ],
    projects: [
      {
        title: "",
        description: "",
        github: "",
        liveDemo: "",
      },
    ],
    certifications: [
      {
        title: "",
        issuer: "",
        year: "",
      },
    ],
    languages: [
      {
        name: "",
        progress: 0,
      },
    ],
    interests: [""],
  })

  // Calculate completion percentage
  const calculateCompletion = () => {
    let completedFields = 0;
    let totalFields = 0;

    // Profile Info
    totalFields += 3;
    if (resumeData.profileInfo.fullName) completedFields++;
    if (resumeData.profileInfo.designation) completedFields++;
    if (resumeData.profileInfo.summary) completedFields++;

    // Contact Info
    totalFields += 2;
    if (resumeData.contactInfo.email) completedFields++;
    if (resumeData.contactInfo.phone) completedFields++;

    // Work Experience
    resumeData.workExperience.forEach(exp => {
      totalFields += 5;
      if (exp.company) completedFields++;
      if (exp.role) completedFields++;
      if (exp.startDate) completedFields++;
      if (exp.endDate) completedFields++;
      if (exp.description) completedFields++;
    });

    // Education
    resumeData.education.forEach(edu => {
      totalFields += 4;
      if (edu.degree) completedFields++;
      if (edu.institution) completedFields++;
      if (edu.startDate) completedFields++;
      if (edu.endDate) completedFields++;
    });

    // Skills
    resumeData.skills.forEach(skill => {
      totalFields += 2;
      if (skill.name) completedFields++;
      if (skill.progress > 0) completedFields++;
    });

    // Projects
    resumeData.projects.forEach(project => {
      totalFields += 4;
      if (project.title) completedFields++;
      if (project.description) completedFields++;
      if (project.github) completedFields++;
      if (project.liveDemo) completedFields++;
    });

    // Certifications
    resumeData.certifications.forEach(cert => {
      totalFields += 3;
      if (cert.title) completedFields++;
      if (cert.issuer) completedFields++;
      if (cert.year) completedFields++;
    });

    // Languages
    resumeData.languages.forEach(lang => {
      totalFields += 2;
      if (lang.name) completedFields++;
      if (lang.progress > 0) completedFields++;
    });

    // Interests
    totalFields += resumeData.interests.length;
    completedFields += resumeData.interests.filter(i => i.trim() !== "").length;

    const percentage = Math.round((completedFields / totalFields) * 100);
    setCompletionPercentage(percentage);
    return percentage;
  };

  useEffect(() => {
    calculateCompletion();
  }, [resumeData]);

  const mergeWithDummyData = (data) => {
    const isFieldEmpty = (val) => {
      if (!val) return true;
      if (Array.isArray(val)) {
        if (val.length === 0) return true;
        // Check if all items in array are practically empty objects
        const allEmptyObjects = val.every(item => item && typeof item === 'object' && Object.values(item).every(v => !v || (typeof v === 'string' && v.trim() === '')));
        return allEmptyObjects;
      }
      if (typeof val === 'string') return val.trim() === '';
      return false;
    };

    const merged = { ...data };
    
    if (isFieldEmpty(merged.profileInfo?.fullName)) {
      merged.profileInfo = { ...DUMMY_RESUME_DATA.profileInfo, ...merged.profileInfo, fullName: merged.profileInfo?.fullName || DUMMY_RESUME_DATA.profileInfo.fullName, designation: merged.profileInfo?.designation || DUMMY_RESUME_DATA.profileInfo.designation, summary: merged.profileInfo?.summary || DUMMY_RESUME_DATA.profileInfo.summary };
    }
    
    if (isFieldEmpty(merged.contactInfo?.email) && isFieldEmpty(merged.contactInfo?.phone)) {
      merged.contactInfo = { ...DUMMY_RESUME_DATA.contactInfo, ...merged.contactInfo };
    }

    if (isFieldEmpty(merged.workExperience)) {
      merged.workExperience = DUMMY_RESUME_DATA.workExperience;
    }
    
    if (isFieldEmpty(merged.education)) {
      merged.education = DUMMY_RESUME_DATA.education;
    }
    
    if (isFieldEmpty(merged.skills)) {
      merged.skills = DUMMY_RESUME_DATA.skills;
    }

    if (isFieldEmpty(merged.projects)) {
      merged.projects = DUMMY_RESUME_DATA.projects;
    }

    return merged;
  }


  const renderAllForms = () => {
    const defaultOrder = ['summary', 'workExperience', 'education', 'skills', 'projects', 'certifications', 'languages', 'interests'];
    const isCustomTheme = resumeData?.template?.theme === 'custom';
    const order = isCustomTheme && resumeData?.template?.customConfig?.sectionOrder ? resumeData.template.customConfig.sectionOrder : defaultOrder;
    const visible = isCustomTheme && resumeData?.template?.customConfig?.visibleSections ? resumeData.template.customConfig.visibleSections : {};

    return (
      <div className="space-y-6 max-w-4xl mx-auto w-full">
        {/* Profile Info and Contact Info always at top */}
        <ProfileInfoForm
          profileData={resumeData?.profileInfo}
          updateSection={(key, value) => updateSection("profileInfo", key, value)}
        />
        <ContactInfoForm
          contactInfo={resumeData?.contactInfo}
          updateSection={(key, value) => updateSection("contactInfo", key, value)}
        />

        {order.map((sectionId) => {
          if (resumeData?.template?.customConfig?.visibleSections && visible[sectionId] === false) {
            return null;
          }

          switch (sectionId) {
            case "workExperience":
              return (
                <WorkExperienceForm key={sectionId}
                  workExperience={resumeData?.workExperience}
                  updateArrayItem={(index, key, value) => updateArrayItem("workExperience", index, key, value)}
                  addArrayItem={(newItem) => addArrayItem("workExperience", newItem)}
                  removeArrayItem={(index) => removeArrayItem("workExperience", index)}
                />
              )
            case "education":
              return (
                <EducationDetailsForm key={sectionId}
                  educationInfo={resumeData?.education}
                  updateArrayItem={(index, key, value) => updateArrayItem("education", index, key, value)}
                  addArrayItem={(newItem) => addArrayItem("education", newItem)}
                  removeArrayItem={(index) => removeArrayItem("education", index)}
                />
              )
            case "skills":
              return (
                <SkillsInfoForm key={sectionId}
                  skillsInfo={resumeData?.skills}
                  updateArrayItem={(index, key, value) => updateArrayItem("skills", index, key, value)}
                  addArrayItem={(newItem) => addArrayItem("skills", newItem)}
                  removeArrayItem={(index) => removeArrayItem("skills", index)}
                />
              )
            case "projects":
              return (
                <ProjectDetailForm key={sectionId}
                  projectInfo={resumeData?.projects}
                  updateArrayItem={(index, key, value) => updateArrayItem("projects", index, key, value)}
                  addArrayItem={(newItem) => addArrayItem("projects", newItem)}
                  removeArrayItem={(index) => removeArrayItem("projects", index)}
                />
              )
            case "certifications":
              return (
                <CertificationInfoForm key={sectionId}
                  certifications={resumeData?.certifications}
                  updateArrayItem={(index, key, value) => updateArrayItem("certifications", index, key, value)}
                  addArrayItem={(newItem) => addArrayItem("certifications", newItem)}
                  removeArrayItem={(index) => removeArrayItem("certifications", index)}
                />
              )
            case "languages":
              return (
                <LanguagesForm key={sectionId}
                  languages={resumeData?.languages}
                  updateArrayItem={(index, key, value) => updateArrayItem("languages", index, key, value)}
                  addArrayItem={() => addArrayItem("languages", { name: "" })}
                  removeArrayItem={(index) => removeArrayItem("languages", index)}
                />
              )
            case "interests":
              return (
                <InterestsForm key={sectionId}
                  interests={resumeData?.interests}
                  updateArrayItem={(index, key, value) => updateArrayItem("interests", index, key, value)}
                  addArrayItem={() => addArrayItem("interests", "")}
                  removeArrayItem={(index) => removeArrayItem("interests", index)}
                />
              )
            default:
              const customSec = resumeData?.customSections?.find(s => s.id === sectionId);
              if (customSec) {
                return (
                  <CustomSectionForm key={sectionId}
                    customSection={customSec}
                    updateSection={(key, value) => {
                      setResumeData(prev => ({
                        ...prev,
                        customSections: prev.customSections.map(s => s.id === sectionId ? { ...s, [key]: value } : s)
                      }))
                    }}
                    updateArrayItem={(index, key, value) => {
                      setResumeData(prev => {
                        const newCustomSections = [...prev.customSections]
                        const secIndex = newCustomSections.findIndex(s => s.id === sectionId)
                        if (secIndex >= 0) {
                          const newItems = [...newCustomSections[secIndex].items]
                          if (key === null) {
                            newItems[index] = value
                          } else {
                            newItems[index] = { ...newItems[index], [key]: value }
                          }
                          newCustomSections[secIndex].items = newItems
                        }
                        return { ...prev, customSections: newCustomSections }
                      })
                    }}
                    addArrayItem={(newItem) => {
                      setResumeData(prev => {
                        const newCustomSections = [...prev.customSections]
                        const secIndex = newCustomSections.findIndex(s => s.id === sectionId)
                        if (secIndex >= 0) {
                          newCustomSections[secIndex].items = [...newCustomSections[secIndex].items, newItem]
                        }
                        return { ...prev, customSections: newCustomSections }
                      })
                    }}
                    removeArrayItem={(index) => {
                      setResumeData(prev => {
                        const newCustomSections = [...prev.customSections]
                        const secIndex = newCustomSections.findIndex(s => s.id === sectionId)
                        if (secIndex >= 0) {
                          newCustomSections[secIndex].items = newCustomSections[secIndex].items.filter((_, i) => i !== index)
                        }
                        return { ...prev, customSections: newCustomSections }
                      })
                    }}
                  />
                )
              }
              return null;
          }
        })}
      </div>
    )
  }

  const updateSection = (section, key, value) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }))
  }

  const updateArrayItem = (section, index, key, value) => {
    setResumeData((prev) => {
      const updatedArray = [...prev[section]]

      if (key === null) {
        updatedArray[index] = value
      } else {
        updatedArray[index] = {
          ...updatedArray[index],
          [key]: value,
        }
      }

      return {
        ...prev,
        [section]: updatedArray,
      }
    })
  }

  const addArrayItem = (section, newItem) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: [...prev[section], newItem],
    }))
  }

  const removeArrayItem = (section, index) => {
    setResumeData((prev) => {
      const updatedArray = [...prev[section]]
      updatedArray.splice(index, 1)
      return {
        ...prev,
        [section]: updatedArray,
      }
    })
  }

  const fetchResumeDetailsById = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_BY_ID(resumeId))

      if (response.data && response.data.profileInfo) {
        const resumeInfo = response.data

        setResumeData((prevState) => ({
          ...prevState,
          title: resumeInfo?.title || "Untitled",
          template: resumeInfo?.template || prevState?.template,
          profileInfo: resumeInfo?.profileInfo || prevState?.profileInfo,
          contactInfo: resumeInfo?.contactInfo || prevState?.contactInfo,
          workExperience: resumeInfo?.workExperience || prevState?.workExperience,
          education: resumeInfo?.education || prevState?.education,
          skills: resumeInfo?.skills || prevState?.skills,
          projects: resumeInfo?.projects || prevState?.projects,
          certifications: resumeInfo?.certifications || prevState?.certifications,
          languages: resumeInfo?.languages || prevState?.languages,
          interests: resumeInfo?.interests || prevState?.interests,
        }))
      }
    } catch (error) {
      console.error("Error fetching resume:", error)
      toast.error("Failed to load resume data")
    }
  }

  const uploadResumeImages = async () => {
    try {
      setIsLoading(true)

      const thumbnailElement = thumbnailRef.current
      if (!thumbnailElement) {
        throw new Error("Thumbnail element not found")
      }

      const fixedThumbnail = fixTailwindColors(thumbnailElement)

      const thumbnailCanvas = await html2canvas(fixedThumbnail, {
        scale: 0.5,
        backgroundColor: "#FFFFFF",
        logging: false,
      })

      document.body.removeChild(fixedThumbnail)

      const thumbnailDataUrl = thumbnailCanvas.toDataURL("image/png")
      const thumbnailFile = dataURLtoFile(
        thumbnailDataUrl,
        `thumbnail-${resumeId}.png`
      )

      const formData = new FormData()
      formData.append("thumbnail", thumbnailFile)

      const uploadResponse = await axiosInstance.put(
        API_PATHS.RESUME.UPLOAD_IMAGES(resumeId),
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )

      const { thumbnailLink } = uploadResponse.data
      await updateResumeDetails(thumbnailLink)

      toast.success("Resume Updated Successfully")
      navigate("/dashboard")
    } catch (error) {
      console.error("Error Uploading Images:", error)
      toast.error("Failed to upload images")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteResume = async () => {
    try {
      setIsLoading(true)
      await axiosInstance.delete(API_PATHS.RESUME.DELETE(resumeId))
      toast.success("Resume deleted successfully")
      navigate("/dashboard")
    } catch (error) {
      console.error("Error deleting resume:", error)
      toast.error("Failed to delete resume")
    } finally {
      setIsLoading(false)
    }
  }

  const updateResumeDetails = async (thumbnailLink) => {
    try {
      setIsLoading(true)

      await axiosInstance.put(API_PATHS.RESUME.UPDATE(resumeId), {
        ...resumeData,
        thumbnailLink: thumbnailLink || "",
        completion: completionPercentage,
      })
    } catch (err) {
      console.error("Error updating resume:", err)
      toast.error("Failed to update resume details")
    } finally {
      setIsLoading(false)
    }
  }

  const downloadPDF = async () => {
    const element = resumeDownloadRef.current;
    if (!element) {
      toast.error("Failed to generate PDF. Please try again.");
      return;
    }

    setIsDownloading(true);
    setDownloadSuccess(false);
    const toastId = toast.loading("Generating PDFâ€¦");

    const override = document.createElement("style");
    override.id = "__pdf_color_override__";
    override.textContent = `
      * {
        color: #000 !important;
        background-color: #fff !important;
        border-color: #000 !important;
      }
    `;
    document.head.appendChild(override);

    try {
      await html2pdf()
        .set({
          margin: 0,
          filename: `${resumeData.title.replace(/[^a-z0-9]/gi, "_")}.pdf`,
          image: { type: "png", quality: 1.0 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            backgroundColor: "#FFFFFF",
            logging: false,
            windowWidth: element.scrollWidth,
          },
          jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "portrait",
          },
          pagebreak: {
            mode: ['avoid-all', 'css', 'legacy']
          }
        })
        .from(element)
        .save();

      toast.success("PDF downloaded successfully!", { id: toastId });
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);

    } catch (err) {
      console.error("PDF error:", err);
      toast.error(`Failed to generate PDF: ${err.message}`, { id: toastId });

    } finally {
      document.getElementById("__pdf_color_override__")?.remove();
      setIsDownloading(false);
    }
  };

  const updateTheme = (theme) => {
    setResumeData(prev => ({
      ...prev,
      template: {
        ...prev.template,
        theme: theme
      }
    }))
  }

  const updateCustomConfig = (newConfig) => {
    setResumeData(prev => ({
      ...prev,
      template: {
        ...prev.template,
        theme: 'custom',
        customConfig: newConfig
      }
    }))
  }

  useEffect(() => {
    if (resumeId) {
      fetchResumeDetailsById()
    }
  }, [resumeId])

  return (
    <PageTransition>
    <DashboardLayout>
      <div className={containerStyles.main}>
        <div className={containerStyles.header}>
          <TitleInput title={resumeData.title}
            setTitle={(value) => setResumeData((prev) => ({
              ...prev,
              title: value,
            }))} />

          <div className='flex flex-gap items-center gap-3'>
            <button onClick={() => setOpenThemeSelector(true)} className={buttonStyles.theme}>
              <Palette size={16} />
              <span className='text-sm'>Theme</span>
            </button>

            <button onClick={handleDeleteResume} className={buttonStyles.delete} disabled={isLoading}>
              <Trash2 size={16} />
              <span className='text-sm'>Delete</span>
            </button>

            <button onClick={() => setOpenPreviewModal(true)} className={buttonStyles.download}>
              <Download size={16} />
              <span className='text-sm'>Preview</span>

            </button>
          </div>
        </div>
        <div className={containerStyles.grid}>
          <div className='flex flex-col h-full lg:h-[calc(100vh-200px)]'>
            <div className='flex-1 overflow-y-auto custom-scrollbar pr-2 mb-4'>
              <div className={containerStyles.formContainer}>
                {renderAllForms()}
              </div>
            </div>

            <div className='shrink-0 bg-[#0a0508] border border-white/10 rounded-2xl p-4 shadow-sm'>
              {errorMsg && (
                <div className='mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-2 text-red-400 text-sm'>
                  <AlertCircle size={16} className='mt-0.5 shrink-0' />
                  {errorMsg}
                </div>
              )}

              <div className='flex flex-wrap items-center justify-between gap-3'>
                <button className={buttonStyles.back} onClick={() => navigate('/dashboard')} disabled={isLoading}>
                  <ArrowLeft size={16} />
                  Dashboard
                </button>

                <div className="flex gap-3">
                  <button className={buttonStyles.save} onClick={uploadResumeImages} disabled={isLoading}>
                    {isLoading ? <Loader2 size={16} className='animate-spin' />
                      : <Save size={16} />}
                    {isLoading ? "Saving..." : "Save & Exit"}
                  </button>
                  <button className={buttonStyles.next} onClick={downloadPDF} disabled={isLoading}>
                    <Download size={16} />
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className='hidden lg:block'>
            <div className={containerStyles.previewContainer}>
              <div className='text-center mb-4'>
                <div className={statusStyles.completionBadge}>
                  <div className={iconStyles.pulseDot}></div>
                  <span >Preview - {completionPercentage}% Complete</span>
                </div>
              </div>

              <div className='preview-container relative' ref={previewContainerRef}>
                <div className={containerStyles.previewInner}>
                  <RenderResume key={`preview-&{resumeData?.template?.theme}`}
                    templateId={resumeData?.template?.theme || ""}
                    resumeData={mergeWithDummyData(resumeData)}
                    containerWidth={previewWidth}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={openThemeSelector} onClose={() => setOpenThemeSelector(false)}
    title="Change Theme" maxWidth="max-w-7xl">
      <ThemeSelector 
        selectedTheme={resumeData?.template?.theme}
        setSelectedTheme={updateTheme} 
        onClose={() => setOpenThemeSelector(false)}
        resumeData={resumeData}
        customConfig={resumeData?.template?.customConfig}
        setCustomConfig={updateCustomConfig}
      />
</Modal>
      <Modal isOpen={openPreviewModal} onClose={() => setOpenPreviewModal(false)}
        title={resumeData.title}
        showActionBtn
        actionBtnText={isDownloading ? "Generating..."
          : downloadSuccess ? "Downloaded!" : "Download PDF"}

        actionBtnIcon={
          isDownloading ? (
            <Loader2 size={16} className='animate-spin' />
          ) : 
          downloadSuccess ? (
            <Check size={16} className='text-white' />
          ) : (
            <Download size={16} />
          )
        }
        onActionClick={downloadPDF}
        >
          <div className='p-6 flex flex-col items-center bg-stone-800/50 min-h-[70vh]'>
            <div className='text-center mb-4'>
              <div className={statusStyles.modalBadge}>
                <div className={iconStyles.pulseDot}></div>
                <span>Completion: {completionPercentage}%</span>
              </div>
            </div>

            <div className='flex justify-center overflow-auto max-h-[75vh]'>
              <div ref={resumeDownloadRef} className='a4-wrapper shadow-xl' style={{ width: '210mm', minHeight: '297mm' }}>
                <div className='w-full h-full'>
                  <RenderResume key={`pdf-${resumeData?.template?.theme}`}
                  templateId={resumeData?.template?.theme || ""}
                  resumeData={mergeWithDummyData(resumeData)}
                  containerWidth={null}
                  />
                </div>
              </div>
            </div>
          </div>
      </Modal>

      <div style={{display:'none'}} ref={thumbnailRef}>
        <div className={containerStyles.hiddenThumbnail}>
          <RenderResume key={`thumb-${resumeData?.template?.theme}`}
          templateId={resumeData?.template?.theme || ""}
          resumeData={mergeWithDummyData(resumeData)}
          />
        </div>
      </div>
    </DashboardLayout>
    </PageTransition>
  )
}

export default EditResume
