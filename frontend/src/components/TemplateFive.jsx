import React, { useEffect, useRef, useState } from "react";
import { formatYearMonth } from "../utils/helper";

const Title = ({ text }) => (
  <h2 className="text-xl font-extrabold text-gray-900 mb-4 flex items-center">
    <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#D4577A] to-[#E88FA2] mr-3 shadow-md"></span>
    {text}
  </h2>
);

const TemplateFive = ({ resumeData = {}, containerWidth }) => {
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
      <li key={i} className="ml-5 list-disc text-sm text-gray-600 leading-relaxed mb-1.5 marker:text-[#E88FA2]">
        {line.replace(/^-/, '').trim()}
      </li>
    ));
  };

  return (
    <div
      ref={resumeRef}
      className="bg-[#FAF5F0] font-sans text-gray-800 min-h-[1056px] p-6"
      style={{
        transform: containerWidth > 0 ? `scale(${scale})` : undefined,
        transformOrigin: "top left",
        width: containerWidth > 0 ? `${baseWidth}px` : undefined,
      }}
    >
      <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden min-h-[1008px] flex flex-col">
        {/* Vibrant Header */}
        <div className="bg-gradient-to-r from-[#D4577A] via-[#E88FA2] to-[#D4577A] p-10 text-white relative overflow-hidden">
          {/* Abstract background shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>
          
          <div className="relative z-10 flex justify-between items-end">
            <div>
              <h1 className="text-5xl font-extrabold tracking-tight mb-2 drop-shadow-md">
                {profileInfo.fullName}
              </h1>
              {profileInfo.designation && (
                <p className="text-xl font-bold text-white/90 drop-shadow">
                  {profileInfo.designation}
                </p>
              )}
            </div>
            
            <div className="text-right text-sm font-medium text-white/90 space-y-1 bg-black/20 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
              {contactInfo.email && <div>{contactInfo.email}</div>}
              {contactInfo.phone && <div>{contactInfo.phone}</div>}
              {contactInfo.location && <div>{contactInfo.location}</div>}
              <div className="flex gap-3 justify-end mt-2 pt-2 border-t border-white/20">
                {contactInfo.linkedin && <a href={contactInfo.linkedin} className="hover:text-white font-bold">LinkedIn</a>}
                {contactInfo.github && <a href={contactInfo.github} className="hover:text-white font-bold">GitHub</a>}
                {contactInfo.website && <a href={contactInfo.website} className="hover:text-white font-bold">Portfolio</a>}
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Content */}
        <div className="flex flex-1">
          {/* Main Content */}
          <div className="w-[65%] p-10 border-r border-gray-100">
            {profileInfo.summary && (
              <div className="mb-8">
                <Title text="About Me" />
                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                  {profileInfo.summary}
                </p>
              </div>
            )}

            {workExperience.length > 0 && (
              <div className="mb-8">
                <Title text="Experience" />
                <div className="space-y-6">
                  {workExperience.map((exp, i) => (
                    <div key={i} className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-[#E88FA2] before:rounded-full after:absolute after:left-[3px] after:top-4 after:w-0.5 after:h-full after:bg-gray-100 last:after:hidden">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-extrabold text-gray-900 text-lg">{exp.role}</h3>
                        <span className="text-xs font-bold text-white bg-[#D4577A] px-2 py-1 rounded-full shadow-sm shrink-0">
                          {formatYearMonth(exp.startDate)} - {formatYearMonth(exp.endDate)}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-[#D4577A] mb-2">{exp.company}</p>
                      <ul className="mt-2">{formatDescription(exp.description)}</ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {projects.length > 0 && (
              <div>
                <Title text="Featured Projects" />
                <div className="grid gap-4">
                  {projects.map((proj, i) => (
                    <div key={i} className="bg-[#FAF5F0] p-5 rounded-2xl border border-[#E88FA2]/20 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-extrabold text-gray-900 text-base">{proj.title}</h3>
                        <div className="flex gap-2">
                          {proj.liveDemo && <a href={proj.liveDemo} className="text-xs font-bold text-white bg-[#D4577A] px-3 py-1 rounded-full">Demo</a>}
                          {proj.github && <a href={proj.github} className="text-xs font-bold text-white bg-gray-800 px-3 py-1 rounded-full">Code</a>}
                        </div>
                      </div>
                      <ul className="mt-2">{formatDescription(proj.description)}</ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Content */}
          <div className="w-[35%] p-10 bg-gray-50/50">
            {skills.length > 0 && (
              <div className="mb-8">
                <Title text="Skills" />
                <div className="flex flex-wrap gap-2">
                  {skills.map((s, i) => (
                    <span key={i} className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-xl shadow-sm">
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {education.length > 0 && (
              <div className="mb-8">
                <Title text="Education" />
                <div className="space-y-4">
                  {education.map((edu, i) => (
                    <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                      <h3 className="font-extrabold text-gray-900 text-sm mb-1">{edu.degree}</h3>
                      <p className="text-sm text-[#D4577A] font-bold mb-2">{edu.institution}</p>
                      <div className="text-xs font-bold text-gray-400">
                        {formatYearMonth(edu.startDate)} - {formatYearMonth(edu.endDate)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {certifications.length > 0 && (
              <div className="mb-8">
                <Title text="Awards & Certs" />
                <ul className="space-y-3">
                  {certifications.map((c, i) => (
                    <li key={i} className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                      <div className="font-bold text-gray-900 text-sm">{c.title}</div>
                      <div className="text-[#D4577A] text-xs font-bold mt-1">{c.issuer} {c.year && `• ${c.year}`}</div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {languages.length > 0 && (
              <div>
                <Title text="Languages" />
                <div className="flex flex-wrap gap-2">
                  {languages.map((l, i) => (
                    <span key={i} className="px-3 py-1 bg-white border border-[#E88FA2]/30 text-[#D4577A] text-sm font-bold rounded-xl shadow-sm">
                      {l.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateFive;
