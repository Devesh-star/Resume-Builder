import React, { useEffect, useRef, useState } from "react";
import { formatYearMonth } from "../utils/helper";

const Title = ({ text }) => (
  <h2 className="text-sm font-bold uppercase tracking-widest text-white bg-[#4F46E5] px-4 py-1.5 mb-4 inline-block shadow-sm">
    {text}
  </h2>
);

const TemplateFour = ({ resumeData = {}, containerWidth }) => {
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
      <li key={i} className="ml-5 list-disc text-sm text-gray-700 leading-relaxed mb-1.5 marker:text-gray-400">
        {line.replace(/^-/, '').trim()}
      </li>
    ));
  };

  return (
    <div
      ref={resumeRef}
      className="bg-white font-sans text-gray-800 min-h-[1056px]"
      style={{
        transform: containerWidth > 0 ? `scale(${scale})` : undefined,
        transformOrigin: "top left",
        width: containerWidth > 0 ? `${baseWidth}px` : undefined,
      }}
    >
      {/* Header Block */}
      <div className="bg-slate-50 text-white p-8 mb-6 shadow-md">
        <h1 className="text-3xl font-extrabold uppercase tracking-widest mb-2 text-center">
          {profileInfo.fullName}
        </h1>
        {profileInfo.designation && (
          <p className="text-lg text-[#818CF8] font-medium text-center mb-4 uppercase tracking-widest">
            {profileInfo.designation}
          </p>
        )}
        
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-300 font-medium">
          {contactInfo.email && <a href={`mailto:${contactInfo.email}`} className="hover:text-white transition-colors">{contactInfo.email}</a>}
          {contactInfo.phone && <span>{contactInfo.phone}</span>}
          {contactInfo.location && <span>{contactInfo.location}</span>}
          {contactInfo.linkedin && <a href={contactInfo.linkedin} className="hover:text-white transition-colors">LinkedIn</a>}
          {contactInfo.website && <a href={contactInfo.website} className="hover:text-white transition-colors">Portfolio</a>}
        </div>
      </div>

      <div className="px-10 pb-10">
        {/* Summary */}
        {profileInfo.summary && (
          <div className="mb-6 border-l-4 border-[#818CF8] pl-4">
            <p className="text-sm text-gray-700 leading-relaxed font-medium italic">
              {profileInfo.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {workExperience.length > 0 && (
          <div className="mb-6">
            <Title text="Executive Experience" />
            <div className="space-y-6">
              {workExperience.map((exp, i) => (
                <div key={i} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-extrabold text-gray-900 text-base">{exp.role}</h3>
                      <p className="text-sm font-bold text-[#4F46E5]">{exp.company}</p>
                    </div>
                    <div className="text-sm font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded">
                      {formatYearMonth(exp.startDate)} — {formatYearMonth(exp.endDate)}
                    </div>
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
          <div className="mb-6">
            <Title text="Key Initiatives" />
            <div className="space-y-6">
              {projects.map((proj, i) => (
                <div key={i} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-extrabold text-gray-900 text-base">{proj.title}</h3>
                    <div className="flex gap-3">
                      {proj.liveDemo && <a href={proj.liveDemo} className="text-xs font-bold text-[#4F46E5] bg-[#F8FAFC] px-2 py-1 rounded hover:bg-[#818CF8] hover:text-white transition-colors">Live Demo</a>}
                      {proj.github && <a href={proj.github} className="text-xs font-bold text-[#4F46E5] bg-[#F8FAFC] px-2 py-1 rounded hover:bg-[#818CF8] hover:text-white transition-colors">Source</a>}
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

        <div className="grid grid-cols-2 gap-8">
          {/* Education */}
          {education.length > 0 && (
            <div>
              <Title text="Education" />
              <div className="space-y-4">
                {education.map((edu, i) => (
                  <div key={i} className="bg-[#F8FAFC] p-4 rounded-lg border border-[#818CF8]/20">
                    <h3 className="font-extrabold text-gray-900 text-sm mb-1">{edu.degree}</h3>
                    <p className="text-sm text-gray-700 font-medium mb-2">{edu.institution}</p>
                    <div className="text-xs font-bold text-[#4F46E5]">
                      {formatYearMonth(edu.startDate)} — {formatYearMonth(edu.endDate)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills & Certs */}
          {(skills.length > 0 || certifications.length > 0) && (
            <div>
              <Title text="Core Competencies" />
              
              {skills.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {skills.map((s, i) => (
                      <span key={i} className="px-3 py-1.5 bg-slate-50 text-white text-xs font-bold rounded shadow-sm">
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {certifications.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 border-b border-gray-200 pb-1">Certifications</h3>
                  <ul className="space-y-2">
                    {certifications.map((c, i) => (
                      <li key={i} className="text-sm">
                        <span className="font-bold text-gray-900">{c.title}</span>
                        <br />
                        <span className="text-gray-500 text-xs">{c.issuer} {c.year && `(${c.year})`}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default TemplateFour;
