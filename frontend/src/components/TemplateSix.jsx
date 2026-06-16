import React, { useEffect, useRef, useState } from "react";
import { formatYearMonth } from "../utils/helper";

const Title = ({ text }) => (
  <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-6 border-t border-gray-100 pt-6">
    {text}
  </h2>
);

const TemplateSix = ({ resumeData = {}, containerWidth }) => {
  const {
    profileInfo = {},
    contactInfo = {},
    education = [],
    languages = [],
    workExperience = [],
    projects = [],
    skills = [],
    certifications = [],
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
      <li key={i} className="ml-0 text-[13px] text-gray-500 leading-relaxed mb-2 flex items-start">
        <span className="text-gray-300 mr-3 mt-0.5 font-mono text-[10px]">0{i + 1}</span>
        <span className="flex-1">{line.replace(/^-/, '').trim()}</span>
      </li>
    ));
  };

  return (
    <div
      ref={resumeRef}
      className="bg-white font-sans text-gray-800 min-h-[1056px] p-12"
      style={{
        transform: containerWidth > 0 ? `scale(${scale})` : undefined,
        transformOrigin: "top left",
        width: containerWidth > 0 ? `${baseWidth}px` : undefined,
      }}
    >
      {/* Ultra Minimal Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-light text-gray-900 tracking-tight mb-2">
          {profileInfo.fullName}
        </h1>
        {profileInfo.designation && (
          <p className="text-sm font-medium text-gray-400 tracking-widest uppercase mb-6">
            {profileInfo.designation}
          </p>
        )}
        
        <div className="flex flex-wrap gap-4 text-[13px] text-gray-500 font-mono">
          {contactInfo.email && <a href={`mailto:${contactInfo.email}`} className="hover:text-gray-900 transition-colors">{contactInfo.email}</a>}
          {contactInfo.phone && <span>{contactInfo.phone}</span>}
          {contactInfo.location && <span>{contactInfo.location}</span>}
          {contactInfo.linkedin && <a href={contactInfo.linkedin} className="hover:text-gray-900 transition-colors">linkedin</a>}
          {contactInfo.website && <a href={contactInfo.website} className="hover:text-gray-900 transition-colors">portfolio</a>}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-12">
        
        {/* Left Column - Meta */}
        <div className="col-span-4 space-y-8">
          
          {profileInfo.summary && (
            <div>
              <Title text="About" />
              <p className="text-[13px] text-gray-500 leading-relaxed">
                {profileInfo.summary}
              </p>
            </div>
          )}

          {skills.length > 0 && (
            <div>
              <Title text="Capabilities" />
              <div className="flex flex-col gap-2">
                {skills.map((s, i) => (
                  <div key={i} className="text-[13px] text-gray-600 font-medium">
                    {s.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div>
              <Title text="Education" />
              <div className="space-y-4">
                {education.map((edu, i) => (
                  <div key={i}>
                    <h3 className="font-medium text-gray-900 text-[13px]">{edu.degree}</h3>
                    <p className="text-[13px] text-gray-500 mt-1">{edu.institution}</p>
                    <div className="text-[11px] font-mono text-gray-400 mt-1">
                      {formatYearMonth(edu.startDate)} - {formatYearMonth(edu.endDate)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column - Experience & Projects */}
        <div className="col-span-8 space-y-8">
          
          {workExperience.length > 0 && (
            <div>
              <Title text="Experience" />
              <div className="space-y-10">
                {workExperience.map((exp, i) => (
                  <div key={i} className="relative">
                    <div className="flex justify-between items-baseline mb-4">
                      <div>
                        <h3 className="font-medium text-gray-900 text-sm">{exp.role}</h3>
                        <p className="text-[13px] text-gray-500 mt-1">{exp.company}</p>
                      </div>
                      <div className="text-[11px] font-mono text-gray-400 text-right">
                        {formatYearMonth(exp.startDate)}<br/>{formatYearMonth(exp.endDate)}
                      </div>
                    </div>
                    <ul className="mt-4">{formatDescription(exp.description)}</ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {projects.length > 0 && (
            <div>
              <Title text="Projects" />
              <div className="space-y-10">
                {projects.map((proj, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-baseline mb-4">
                      <h3 className="font-medium text-gray-900 text-sm">{proj.title}</h3>
                      <div className="flex gap-4 text-[11px] font-mono text-gray-400">
                        {proj.liveDemo && <a href={proj.liveDemo} className="hover:text-gray-900 border-b border-gray-200">demo</a>}
                        {proj.github && <a href={proj.github} className="hover:text-gray-900 border-b border-gray-200">code</a>}
                      </div>
                    </div>
                    <ul className="mt-4">{formatDescription(proj.description)}</ul>
                  </div>
                ))}
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default TemplateSix;
