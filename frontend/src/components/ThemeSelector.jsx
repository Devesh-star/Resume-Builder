import React, { useCallback, useEffect, useRef, useState } from 'react'
import { DUMMY_RESUME_DATA, resumeTemplates } from '../utils/data'
import { Check } from 'lucide-react';
import RenderResume from './RenderResume';
import CustomTemplate from './CustomTemplate';
import CustomTemplateBuilder from './CustomTemplateBuilder';
import Tabs from './Tabs'

const TAB_DATA = [{ label: 'Templates' }, { label: 'Custom Builder' }]

const MiniTemplatePreview = ({ templateId, isSelected, onSelect, title }) => {
  const [scale, setScale] = useState(0.15);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      if (width > 0) setScale(width / 800);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`group relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300 flex flex-col border-2 ${
        isSelected
          ? 'border-primary shadow-lg shadow-primary/20 ring-4 ring-primary/10'
          : 'border-transparent hover:border-primary/40 hover:shadow-md bg-white ring-1 ring-app-border'
      }`}
      onClick={onSelect}
    >
      <div ref={containerRef} className="relative w-full bg-app-bg overflow-hidden aspect-[1/1.414]">
        <div
          className="absolute top-0 left-0"
          style={{
            width: '800px',
            height: '1056px',
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            pointerEvents: 'none',
          }}
        >
          <RenderResume
            templateId={templateId}
            resumeData={DUMMY_RESUME_DATA}
            containerWidth={0}
          />
        </div>
        <div className="absolute inset-0 z-10 bg-transparent" />
      </div>

      <div className={`px-3 py-2.5 text-center text-[12px] font-semibold border-t transition-colors shrink-0 z-20 ${
        isSelected
          ? 'bg-primary text-white border-primary'
          : 'bg-white text-text-main border-app-border'
      }`}>
        {title}
      </div>

      {isSelected && (
        <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center shadow-md z-30 ring-2 ring-white">
          <Check size={12} className="text-white" strokeWidth={3} />
        </div>
      )}
    </div>
  )
}

const DEFAULT_CUSTOM_CONFIG = {
  layout: 'two-column-left',
  visibleSections: {
    summary: true,
    workExperience: true,
    education: true,
    skills: true,
    projects: true,
    certifications: true,
    languages: true,
    interests: true,
  },
  sectionOrder: ['summary', 'workExperience', 'education', 'skills', 'projects', 'certifications', 'languages', 'interests'],
  accentColor: '#7C3AED',
  fontFamily: 'Inter',
  headerStyle: 'left-aligned',
}

const ThemeSelector = ({ selectedTheme, setSelectedTheme, onClose, resumeData, customConfig, setCustomConfig }) => {

  const previewContainerRef = useRef(null);
  const [previewDimensions, setPreviewDimensions] = useState({ width: 0, height: 0 });

  const measureRef = useCallback((node) => {
    if (node) {
      const ro = new ResizeObserver((entries) => {
        const { width, height } = entries[0].contentRect;
        setPreviewDimensions({ width, height });
      });
      ro.observe(node);
      previewContainerRef.current = ro;
    }
  }, []);

  const initialIndex = resumeTemplates.findIndex(t => t.id === selectedTheme)
  const [selectedTemplate, setselectedTemplate] = useState({
    theme: selectedTheme || resumeTemplates[0]?.id || "",
    index: initialIndex >= 0 ? initialIndex : 0
  })

  const [tabValue, settabValue] = useState("Templates");
  const [localCustomConfig, setLocalCustomConfig] = useState(customConfig || DEFAULT_CUSTOM_CONFIG);

  const isCustomMode = tabValue === 'Custom Builder';

  const getPreviewData = () => {
    return {
      ...DUMMY_RESUME_DATA,
      profileInfo: {
        ...DUMMY_RESUME_DATA.profileInfo,
        ...resumeData.profileInfo,
        fullName: resumeData.profileInfo?.fullName?.trim() || DUMMY_RESUME_DATA.profileInfo.fullName,
        designation: resumeData.profileInfo?.designation?.trim() || DUMMY_RESUME_DATA.profileInfo.designation,
        summary: resumeData.profileInfo?.summary?.trim() || DUMMY_RESUME_DATA.profileInfo.summary,
      },
      contactInfo: {
        ...DUMMY_RESUME_DATA.contactInfo,
        ...Object.fromEntries(Object.entries(resumeData.contactInfo || {}).filter(([_, v]) => v?.trim() !== ''))
      },
      workExperience: resumeData.workExperience?.length > 0 && resumeData.workExperience[0].company?.trim() ? resumeData.workExperience : DUMMY_RESUME_DATA.workExperience,
      education: resumeData.education?.length > 0 && resumeData.education[0].institution?.trim() ? resumeData.education : DUMMY_RESUME_DATA.education,
      projects: resumeData.projects?.length > 0 && resumeData.projects[0].title?.trim() ? resumeData.projects : DUMMY_RESUME_DATA.projects,
      skills: resumeData.skills?.length > 0 && resumeData.skills[0].name?.trim() ? resumeData.skills : DUMMY_RESUME_DATA.skills,
      certifications: resumeData.certifications?.length > 0 && resumeData.certifications[0].title?.trim() ? resumeData.certifications : DUMMY_RESUME_DATA.certifications,
      languages: resumeData.languages?.length > 0 && resumeData.languages[0].name?.trim() ? resumeData.languages : DUMMY_RESUME_DATA.languages,
      interests: resumeData.interests?.length > 0 && resumeData.interests[0]?.trim() ? resumeData.interests : DUMMY_RESUME_DATA.interests,
    };
  };

  const previewData = getPreviewData();

  const handleThemeSelection = () => {
    if (tabValue === 'Custom Builder') {
      setSelectedTheme('custom');
      if (setCustomConfig) setCustomConfig(localCustomConfig);
    } else {
      setSelectedTheme(selectedTemplate.theme);
    }
    onClose()
  }

  const PAGE_WIDTH = 800;
  const PAGE_HEIGHT = 1056;
  const availableWidth = Math.max(previewDimensions.width - 48, 0);
  const previewScale = Math.min(availableWidth / PAGE_WIDTH, 0.9);

  return (
    <div className='flex flex-col overflow-hidden bg-app-bg' style={{ height: '85vh' }}>
      {/* Top bar */}
      <div className='flex items-center justify-between gap-4 p-4 mx-6 mt-6 mb-4 bg-white rounded-2xl border border-app-border shadow-sm overflow-hidden shrink-0'>
        <div className='min-w-0 shrink overflow-hidden'>
          <Tabs tabs={TAB_DATA} activeTab={tabValue} setActiveTab={settabValue} />
        </div>
        <button
          className='btn-primary shrink-0 flex items-center gap-2 px-6 py-2.5 shadow-md shadow-primary/20 cursor-pointer whitespace-nowrap'
          onClick={handleThemeSelection}
        >
          <Check size={18} /> Apply Theme
        </button>
      </div>

      {/* Main content — fills remaining height */}
      <div className='flex gap-6 flex-1 min-h-0 overflow-hidden px-6 pb-6'>

        {/* Left: Template selector */}
        <div className='w-[280px] min-w-[280px] max-w-[280px] shrink-0 flex flex-col min-h-0'>
          <div className='bg-white rounded-2xl border border-app-border p-4 flex-1 min-h-0 overflow-hidden flex flex-col shadow-sm'>
            <h3 className='text-xs font-bold text-text-muted uppercase tracking-wider mb-4 px-1 shrink-0'>
              {isCustomMode ? 'Builder Options' : `${resumeTemplates.length} Templates Available`}
            </h3>
            {isCustomMode ? (
              <div className='flex-1 min-h-0 overflow-y-auto overflow-x-hidden custom-scrollbar pr-2'>
                <CustomTemplateBuilder config={localCustomConfig} onChange={setLocalCustomConfig} resumeData={previewData} />
              </div>
            ) : (
              <div className='grid grid-cols-2 gap-3 flex-1 min-h-0 overflow-y-auto overflow-x-hidden custom-scrollbar p-1 pb-4'>
                {resumeTemplates.map((template, index) => (
                  <MiniTemplatePreview
                    key={`templates_${index}`}
                    templateId={template.id}
                    title={template.title}
                    thumbnailImg={template.thumbnailImg}
                    isSelected={selectedTemplate.index === index}
                    onSelect={() => setselectedTemplate({ theme: template.id, index })}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Full preview — flex-1 fills ALL remaining width */}
        <div
          className='flex-1 min-w-0 min-h-0 rounded-2xl border border-app-border overflow-hidden flex flex-col relative'
          style={{ background: 'linear-gradient(135deg, #F8F9FB 0%, #E5E7EB 100%)' }}
        >
          {/* Preview label */}
          <div className='flex items-center justify-between px-5 py-3 bg-white/80 backdrop-blur-md border-b border-app-border shrink-0 z-10'>
            <span className='text-xs font-bold text-text-muted uppercase tracking-wider'>Live Preview</span>
            <span className='text-sm font-semibold text-primary px-3 py-1 bg-primary/10 rounded-lg'>
              {isCustomMode ? 'Custom Theme' : resumeTemplates[selectedTemplate.index]?.title || 'Custom'}
            </span>
          </div>

          {/* Resume page */}
          <div
            className='flex-1 min-h-0 flex items-start justify-center overflow-y-auto overflow-x-hidden custom-scrollbar p-6'
            ref={measureRef}
          >
            <div
              style={{
                width: `${PAGE_WIDTH * previewScale}px`,
                height: `${PAGE_HEIGHT * previewScale}px`,
                flexShrink: 0,
              }}
            >
              <div
                className='bg-white rounded-sm shadow-2xl shadow-slate-400/20 origin-top-left'
                style={{
                  width: `${PAGE_WIDTH}px`,
                  height: `${PAGE_HEIGHT}px`,
                  transform: `scale(${previewScale})`,
                }}
              >
                {isCustomMode ? (
                  <CustomTemplate
                    resumeData={previewData}
                    customConfig={localCustomConfig}
                    containerWidth={0}
                  />
                ) : (
                  <RenderResume
                    templateId={selectedTemplate?.theme || ""}
                    resumeData={previewData}
                    containerWidth={0}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThemeSelector