import React, { useEffect, useRef, useState } from "react";
import { formatYearMonth } from "../utils/helper";

const Title = ({ text }) => (
  <h2 className="text-[15px] font-bold text-gray-800 uppercase tracking-widest mt-6 mb-3">
    {text}
  </h2>
);

const TemplateTwo = ({ resumeData = {}, containerWidth }) => {
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

  const formatDescription = (desc) => {
    if (!desc) return null;
    return desc.split('\n').filter(line => line.trim().length > 0).map((line, i) => (
      <li key={i} className="ml-5 list-disc text-sm text-gray-600 leading-relaxed mb-1.5 marker:text-gray-400">
        {line.replace(/^-/, '').trim()}
      </li>
    ));
  };

  return (
    <div
      ref={resumeRef}
      className="p-10 bg-white font-sans text-gray-800 min-h-[1056px]"
      style={{
        transform: containerWidth > 0 ? `scale(${scale})` : undefined,
        transformOrigin: "top left",
        width: containerWidth > 0 ? `${baseWidth}px` : undefined,
      }}
    >
      {/* Header */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
          {profileInfo.fullName}
        </h1>
        {profileInfo.designation && (
          <p className="text-lg text-gray-600 font-medium mb-4">{profileInfo.designation}</p>
        )}
        
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500 font-medium">
          {contactInfo.location && <span>{contactInfo.location}</span>}
          
          {contactInfo.phone && <span>{contactInfo.phone}</span>}
          
          {contactInfo.email && (
            <a href={`mailto:${contactInfo.email}`} className="text-violet-600 hover:underline">
              {contactInfo.email}
            </a>
          )}
          
          {contactInfo.linkedin && (
            <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">
              LinkedIn
            </a>
          )}
          
          {contactInfo.github && (
            <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">
              GitHub
            </a>
          )}
          
          {contactInfo.website && (
            <a href={contactInfo.website} target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">
              Portfolio
            </a>
          )}
        </div>
      </div>

      {/* Summary */}
      {profileInfo.summary && (
        <div className="mb-6">
          <p className="text-sm text-gray-600 leading-relaxed">
            {profileInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {workExperience.length > 0 && (
        <div>
          <Title text="Experience" />
          <div className="space-y-6">
            {workExperience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-gray-900">{exp.role}</h3>
                    <p className="text-sm font-medium text-gray-700">{exp.company}</p>
                  </div>
                  <span className="text-sm font-medium text-gray-500 shrink-0">
                    {formatYearMonth(exp.startDate)} — {formatYearMonth(exp.endDate)}
                  </span>
                </div>
                <ul className="mt-2">
                  {formatDescription(exp.description)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div>
          <Title text="Projects" />
          <div className="space-y-6">
            {projects.map((proj, i) => (
              <div key={i}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-gray-900">{proj.title}</h3>
                    <div className="flex gap-3 mt-0.5">
                      {proj.liveDemo && (
                        <a href={proj.liveDemo} className="text-xs font-medium text-violet-600 hover:underline">Live Demo</a>
                      )}
                      {proj.github && (
                        <a href={proj.github} className="text-xs font-medium text-violet-600 hover:underline">Source Code</a>
                      )}
                    </div>
                  </div>
                </div>
                <ul className="mt-2">
                  {formatDescription(proj.description)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div>
          <Title text="Education" />
          <div className="space-y-4">
            {education.map((edu, i) => (
              <div key={i} className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900">{edu.institution}</h3>
                  <p className="text-sm text-gray-700">{edu.degree}</p>
                </div>
                <span className="text-sm font-medium text-gray-500 shrink-0">
                  {formatYearMonth(edu.startDate)} — {formatYearMonth(edu.endDate)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills & Other Info */}
      {(skills.length > 0 || certifications.length > 0 || languages.length > 0) && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {skills.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-2">Technical Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s, i) => (
                    <span key={i} className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md">
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              {certifications.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-2">Certifications</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {certifications.map((c, i) => (
                      <li key={i}>{c.title} <span className="text-gray-400">— {c.issuer}</span></li>
                    ))}
                  </ul>
                </div>
              )}
              
              {languages.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-2">Languages</h3>
                  <p className="text-sm text-gray-600">
                    {languages.map(l => l.name).join(", ")}
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateTwo;