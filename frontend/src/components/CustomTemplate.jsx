import React, { useEffect, useRef, useState } from "react";
import { LuMail, LuPhone, LuGithub, LuGlobe, LuMapPin } from "react-icons/lu";
import { RiLinkedinLine } from "react-icons/ri";
import {
  EducationInfo,
  WorkExperience,
  ProjectInfo,
  CertificationInfo,
} from "./ResumeSection";
import { formatYearMonth } from "../utils/helper";

const DEFAULT_CONFIG = {
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
  accentColor: '#00f0ff',
  fontFamily: 'Inter',
  headerStyle: 'left-aligned',
};

const SectionTitle = ({ text, color }) => (
  <div className="mb-3">
    <h2 className="text-xs font-bold uppercase tracking-[0.15em] mb-1.5" style={{ color }}>
      {text}
    </h2>
    <div className="w-10 h-0.5 rounded" style={{ backgroundColor: color }}></div>
  </div>
);

const CustomTemplate = ({ resumeData = {}, customConfig = {}, containerWidth }) => {
  const config = { ...DEFAULT_CONFIG, ...customConfig, visibleSections: { ...DEFAULT_CONFIG.visibleSections, ...(customConfig?.visibleSections || {}) } };
  const {
    profileInfo = {},
    contactInfo = {},
    education = [],
    languages = [],
    workExperience = [],
    projects = [],
    skills = [],
    certifications = [],
    interests = [],
    customSections = [],
  } = resumeData;

  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(800);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (resumeRef.current && containerWidth > 0) {
      const actualWidth = resumeRef.current.offsetWidth;
      if (actualWidth > 0) {
        setBaseWidth(actualWidth);
        setScale(containerWidth / actualWidth);
      }
    }
  }, [containerWidth]);

  const accent = config.accentColor;
  const accentBg = `${accent}15`;

  const renderSection = (sectionKey) => {
    if (!config.visibleSections[sectionKey]) return null;

    switch (sectionKey) {
      case 'summary':
        return profileInfo.summary ? (
          <div key="summary" className="mb-4">
            <SectionTitle text="Summary" color={accent} />
            <p className="text-sm leading-relaxed text-gray-600">{profileInfo.summary}</p>
          </div>
        ) : null;

      case 'workExperience':
        return workExperience.length > 0 ? (
          <div key="workExperience" className="mb-4">
            <SectionTitle text="Experience" color={accent} />
            <div className="space-y-4">
              {workExperience.map((exp, i) => (
                <WorkExperience key={i} company={exp.company} role={exp.role}
                  duration={`${formatYearMonth(exp.startDate)} - ${formatYearMonth(exp.endDate)}`}
                  description={exp.description} durationColor={accent} />
              ))}
            </div>
          </div>
        ) : null;

      case 'education':
        return education.length > 0 ? (
          <div key="education" className="mb-4">
            <SectionTitle text="Education" color={accent} />
            <div className="space-y-3">
              {education.map((edu, i) => (
                <EducationInfo key={i} degree={edu.degree} institution={edu.institution}
                  duration={`${formatYearMonth(edu.startDate)} - ${formatYearMonth(edu.endDate)}`} />
              ))}
            </div>
          </div>
        ) : null;

      case 'skills':
        return skills.length > 0 ? (
          <div key="skills" className="mb-4">
            <SectionTitle text="Skills" color={accent} />
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill, i) => (
                <span key={i} className="text-xs font-medium px-2.5 py-1 rounded" style={{ backgroundColor: accentBg, color: accent }}>
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ) : null;

      case 'projects':
        return projects.length > 0 ? (
          <div key="projects" className="mb-4">
            <SectionTitle text="Projects" color={accent} />
            <div className="space-y-3">
              {projects.map((proj, i) => (
                <ProjectInfo key={i} title={proj.title} description={proj.description}
                  githubLink={proj.github} liveDemoUrl={proj.liveDemo} bgColor={accentBg} />
              ))}
            </div>
          </div>
        ) : null;

      case 'certifications':
        return certifications.length > 0 ? (
          <div key="certifications" className="mb-4">
            <SectionTitle text="Certifications" color={accent} />
            <div className="space-y-2">
              {certifications.map((cert, i) => (
                <CertificationInfo key={i} title={cert.title} issuer={cert.issuer} year={cert.year} bgColor={accentBg} />
              ))}
            </div>
          </div>
        ) : null;

      case 'languages':
        return languages.length > 0 ? (
          <div key="languages" className="mb-4">
            <SectionTitle text="Languages" color={accent} />
            <div className="flex flex-wrap gap-1.5">
              {languages.map((lang, i) => (
                <span key={i} className="text-xs font-medium px-2.5 py-1 rounded" style={{ backgroundColor: accentBg, color: accent }}>
                  {lang.name}
                </span>
              ))}
            </div>
          </div>
        ) : null;

      case 'interests':
        return interests.length > 0 && interests.some(i => i) ? (
          <div key="interests" className="mb-4">
            <SectionTitle text="Interests" color={accent} />
            <div className="flex flex-wrap gap-1.5">
              {interests.map((int, i) => int ? (
                <span key={i} className="text-xs font-medium px-2.5 py-1 rounded" style={{ backgroundColor: accentBg, color: accent }}>
                  {int}
                </span>
              ) : null)}
            </div>
          </div>
        ) : null;

      default:
        // Check if it's a custom section
        if (sectionKey.startsWith('custom-')) {
          const customSection = customSections.find(s => s.id === sectionKey);
          if (customSection && customSection.items && customSection.items.length > 0) {
            return (
              <div key={sectionKey} className="mb-4">
                <SectionTitle text={customSection.title || 'Custom Section'} color={accent} />
                <div className="space-y-4">
                  {customSection.items.map((item, i) => (
                    <WorkExperience key={i} company={item.subtitle} role={item.title}
                      duration={item.date} description={item.description} durationColor={accent} />
                  ))}
                </div>
              </div>
            );
          }
        }
        return null;
    }
  };

  const currentOrder = config.sectionOrder || DEFAULT_CONFIG.sectionOrder;
  const customSectionIds = customSections.map(s => s.id);
  const missingKeys = customSectionIds.filter(k => !currentOrder.includes(k));
  const effectiveSectionOrder = [...currentOrder, ...missingKeys];
  
  const orderedSections = effectiveSectionOrder.filter(s => config.visibleSections[s] !== false);
  const mainSections = ['summary', 'workExperience', 'projects', ...customSectionIds];
  const sidebarSections = ['skills', 'education', 'certifications', 'languages', 'interests'];

  const renderHeader = () => {
    const contactItems = (
      <div className="flex flex-wrap gap-3 text-xs text-gray-600">
        {contactInfo.email && <div className="flex items-center gap-1"><LuMail size={11} style={{ color: accent }} /><span>{contactInfo.email}</span></div>}
        {contactInfo.phone && <div className="flex items-center gap-1"><LuPhone size={11} style={{ color: accent }} /><span>{contactInfo.phone}</span></div>}
        {contactInfo.location && <div className="flex items-center gap-1"><LuMapPin size={11} style={{ color: accent }} /><span>{contactInfo.location}</span></div>}
        {contactInfo.linkedin && <div className="flex items-center gap-1"><RiLinkedinLine size={11} style={{ color: accent }} /><a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a></div>}
        {contactInfo.github && <div className="flex items-center gap-1"><LuGithub size={11} style={{ color: accent }} /><a href={contactInfo.github} target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a></div>}
      </div>
    );

    if (config.headerStyle === 'centered') {
      return (
        <div className="text-center mb-5 pb-4 border-b-2" style={{ borderColor: accent }}>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">{profileInfo.fullName}</h1>
          <p className="text-lg font-medium mb-3" style={{ color: accent }}>{profileInfo.designation}</p>
          <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-600">
            {contactInfo.email && <span>{contactInfo.email}</span>}
            {contactInfo.phone && <span>• {contactInfo.phone}</span>}
            {contactInfo.location && <span>• {contactInfo.location}</span>}
          </div>
        </div>
      );
    }

    if (config.headerStyle === 'split') {
      return (
        <div className="flex justify-between items-start mb-5 pb-4 border-b-2" style={{ borderColor: accent }}>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">{profileInfo.fullName}</h1>
            <p className="text-lg font-medium" style={{ color: accent }}>{profileInfo.designation}</p>
          </div>
          <div className="text-right text-xs text-gray-600 space-y-1">
            {contactInfo.email && <div>{contactInfo.email}</div>}
            {contactInfo.phone && <div>{contactInfo.phone}</div>}
            {contactInfo.location && <div>{contactInfo.location}</div>}
          </div>
        </div>
      );
    }

    // left-aligned (default)
    return (
      <div className="mb-5 pb-4 border-b-2" style={{ borderColor: accent }}>
        <h1 className="text-3xl font-bold text-gray-900 mb-1">{profileInfo.fullName}</h1>
        <p className="text-lg font-medium mb-3" style={{ color: accent }}>{profileInfo.designation}</p>
        {contactItems}
      </div>
    );
  };

  const renderBody = () => {
    if (config.layout === 'single') {
      return (
        <div className="space-y-1">
          {orderedSections.map(s => renderSection(s))}
        </div>
      );
    }

    const mainContent = orderedSections.filter(s => mainSections.includes(s));
    const sideContent = orderedSections.filter(s => sidebarSections.includes(s));

    if (config.layout === 'two-column-right') {
      return (
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1 space-y-1">{sideContent.map(s => renderSection(s))}</div>
          <div className="col-span-2 space-y-1">{mainContent.map(s => renderSection(s))}</div>
        </div>
      );
    }

    // two-column-left (default)
    return (
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-1">{mainContent.map(s => renderSection(s))}</div>
        <div className="col-span-1 space-y-1">{sideContent.map(s => renderSection(s))}</div>
      </div>
    );
  };

  return (
    <div
      ref={resumeRef}
      className="bg-white p-6 font-sans text-gray-800"
      style={{
        fontFamily: config.fontFamily,
        transform: containerWidth > 0 ? `scale(${scale})` : undefined,
        transformOrigin: "top left",
        width: containerWidth > 0 ? `${baseWidth}px` : undefined,
      }}
    >
      {renderHeader()}
      {renderBody()}
    </div>
  );
};

export default CustomTemplate;
