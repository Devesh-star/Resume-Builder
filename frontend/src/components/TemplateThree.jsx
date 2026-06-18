import React, { useEffect, useRef, useState } from "react";
import { formatYearMonth } from "../utils/helper";

const TemplateThree = ({ resumeData = {}, containerWidth }) => {
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
      <li key={i} className="ml-4 list-disc text-sm text-gray-700 leading-relaxed mb-1 marker:text-[#4F46E5]">
        {line.replace(/^-/, '').trim()}
      </li>
    ));
  };

  return (
    <div
      ref={resumeRef}
      className="bg-white font-sans text-gray-800 min-h-[1056px] flex"
      style={{
        transform: containerWidth > 0 ? `scale(${scale})` : undefined,
        transformOrigin: "top left",
        width: containerWidth > 0 ? `${baseWidth}px` : undefined,
      }}
    >
      {/* Left Column (Accent) */}
      <div className="w-[35%] bg-[#F8FAFC] p-8 border-r border-[#818CF8]/20 shrink-0">
        <div className="mb-8">
          <div className="w-24 h-24 bg-[#4F46E5] text-white rounded-full flex items-center justify-center text-4xl font-bold mb-4 shadow-lg mx-auto">
            {profileInfo.fullName ? profileInfo.fullName.charAt(0).toUpperCase() : "R"}
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 text-center leading-tight">
            {profileInfo.fullName}
          </h1>
          <p className="text-[#4F46E5] font-bold text-center mt-2 text-sm uppercase tracking-wider">
            {profileInfo.designation}
          </p>
        </div>

        <div className="space-y-8">
          {/* Contact */}
          <div>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4 border-b border-[#818CF8]/30 pb-2">
              Contact
            </h2>
            <div className="space-y-3 text-sm text-gray-700 font-medium">
              {contactInfo.email && <div className="break-all">{contactInfo.email}</div>}
              {contactInfo.phone && <div>{contactInfo.phone}</div>}
              {contactInfo.location && <div>{contactInfo.location}</div>}
              {contactInfo.linkedin && <div className="break-all">{contactInfo.linkedin}</div>}
              {contactInfo.website && <div className="break-all">{contactInfo.website}</div>}
            </div>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4 border-b border-[#818CF8]/30 pb-2">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((s, i) => (
                  <span key={i} className="px-3 py-1 bg-white border border-[#818CF8]/50 text-[#4F46E5] text-xs font-bold rounded-full shadow-sm">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4 border-b border-[#818CF8]/30 pb-2">
                Languages
              </h2>
              <ul className="space-y-2 text-sm text-gray-700 font-medium">
                {languages.map((l, i) => (
                  <li key={i}>{l.name}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4 border-b border-[#818CF8]/30 pb-2">
                Certifications
              </h2>
              <ul className="space-y-3 text-sm">
                {certifications.map((c, i) => (
                  <li key={i}>
                    <div className="font-bold text-gray-900">{c.title}</div>
                    <div className="text-gray-600 text-xs mt-0.5">{c.issuer} {c.year && `• ${c.year}`}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Right Column (Main Content) */}
      <div className="w-[65%] p-8 bg-white">
        
        {/* Summary */}
        {profileInfo.summary && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest mb-3 flex items-center">
              <span className="w-8 h-[2px] bg-[#4F46E5] mr-3"></span>
              Profile
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              {profileInfo.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {workExperience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest mb-5 flex items-center">
              <span className="w-8 h-[2px] bg-[#4F46E5] mr-3"></span>
              Experience
            </h2>
            <div className="space-y-6 border-l-2 border-gray-100 ml-2 pl-6">
              {workExperience.map((exp, i) => (
                <div key={i} className="relative">
                  <div className="absolute w-3 h-3 bg-[#4F46E5] rounded-full -left-[31px] top-1.5 ring-4 ring-white"></div>
                  <h3 className="font-bold text-gray-900 text-base">{exp.role}</h3>
                  <div className="text-[#4F46E5] text-sm font-bold mb-2">
                    {exp.company} <span className="text-gray-400 font-medium mx-2">•</span> <span className="text-gray-500 font-medium">{formatYearMonth(exp.startDate)} — {formatYearMonth(exp.endDate)}</span>
                  </div>
                  <ul>{formatDescription(exp.description)}</ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest mb-5 flex items-center">
              <span className="w-8 h-[2px] bg-[#4F46E5] mr-3"></span>
              Education
            </h2>
            <div className="space-y-6 border-l-2 border-gray-100 ml-2 pl-6">
              {education.map((edu, i) => (
                <div key={i} className="relative">
                  <div className="absolute w-3 h-3 bg-gray-300 rounded-full -left-[31px] top-1.5 ring-4 ring-white"></div>
                  <h3 className="font-bold text-gray-900 text-base">{edu.degree}</h3>
                  <div className="text-gray-600 text-sm font-medium mb-1">{edu.institution}</div>
                  <div className="text-gray-400 text-xs font-medium">
                    {formatYearMonth(edu.startDate)} — {formatYearMonth(edu.endDate)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest mb-5 flex items-center">
              <span className="w-8 h-[2px] bg-[#4F46E5] mr-3"></span>
              Projects
            </h2>
            <div className="space-y-6 border-l-2 border-gray-100 ml-2 pl-6">
              {projects.map((proj, i) => (
                <div key={i} className="relative">
                  <div className="absolute w-3 h-3 bg-gray-300 rounded-full -left-[31px] top-1.5 ring-4 ring-white"></div>
                  <h3 className="font-bold text-gray-900 text-base">{proj.title}</h3>
                  <div className="flex gap-3 mt-1 mb-2">
                    {proj.liveDemo && (
                      <a href={proj.liveDemo} className="text-xs font-bold text-[#4F46E5] hover:underline">Live Demo</a>
                    )}
                    {proj.github && (
                      <a href={proj.github} className="text-xs font-bold text-[#4F46E5] hover:underline">GitHub</a>
                    )}
                  </div>
                  <ul>{formatDescription(proj.description)}</ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateThree;