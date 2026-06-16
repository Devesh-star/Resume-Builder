import React, { useEffect, useRef, useState } from "react";
import { formatYearMonth } from "../utils/helper";

const Title = ({ text }) => (
  <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest mb-4 pb-2 border-b-2 border-gray-100 flex items-center">
    <span className="w-2 h-6 bg-[#D4577A] mr-3 inline-block"></span>
    {text}
  </h2>
);

const TemplateSeven = ({ resumeData = {}, containerWidth }) => {
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
      <li key={i} className="ml-5 list-disc text-[13px] text-gray-700 leading-relaxed mb-1.5 marker:text-[#D4577A]">
        {line.replace(/^-/, '').trim()}
      </li>
    ));
  };

  return (
    <div
      ref={resumeRef}
      className="bg-white font-sans text-gray-800 min-h-[1056px] relative"
      style={{
        transform: containerWidth > 0 ? `scale(${scale})` : undefined,
        transformOrigin: "top left",
        width: containerWidth > 0 ? `${baseWidth}px` : undefined,
      }}
    >
      {/* Bold Header */}
      <div className="bg-[#1f2937] text-white p-10 pb-16 relative">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[#111827] skew-x-12 translate-x-8 opacity-50"></div>
        
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl font-black uppercase tracking-tight mb-2">
            {profileInfo.fullName}
          </h1>
          {profileInfo.designation && (
            <p className="text-xl font-medium text-[#E88FA2] uppercase tracking-widest mb-6">
              {profileInfo.designation}
            </p>
          )}
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-300 font-medium">
            {contactInfo.email && (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#D4577A]/20 flex items-center justify-center text-[#E88FA2] text-xs">@</div>
                <span>{contactInfo.email}</span>
              </div>
            )}
            {contactInfo.phone && (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#D4577A]/20 flex items-center justify-center text-[#E88FA2] text-xs">P</div>
                <span>{contactInfo.phone}</span>
              </div>
            )}
            {contactInfo.location && (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#D4577A]/20 flex items-center justify-center text-[#E88FA2] text-xs">L</div>
                <span>{contactInfo.location}</span>
              </div>
            )}
            {contactInfo.linkedin && (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#D4577A]/20 flex items-center justify-center text-[#E88FA2] text-xs">in</div>
                <a href={contactInfo.linkedin} className="hover:text-white">LinkedIn</a>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-10 -mt-8 relative z-20">
        <div className="bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-8 mb-8 border border-gray-100">
          
          {/* Summary */}
          {profileInfo.summary && (
            <div className="mb-8">
              <Title text="Profile" />
              <p className="text-sm text-gray-600 leading-relaxed font-medium">
                {profileInfo.summary}
              </p>
            </div>
          )}

          {/* Two Column Layout within the card */}
          <div className="grid grid-cols-12 gap-10">
            
            {/* Main Content */}
            <div className="col-span-8 space-y-8">
              {workExperience.length > 0 && (
                <div>
                  <Title text="Experience" />
                  <div className="space-y-6">
                    {workExperience.map((exp, i) => (
                      <div key={i}>
                        <h3 className="font-bold text-gray-900 text-base">{exp.role}</h3>
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-sm font-bold text-[#D4577A]">{exp.company}</p>
                          <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {formatYearMonth(exp.startDate)} - {formatYearMonth(exp.endDate)}
                          </span>
                        </div>
                        <ul className="mt-2">{formatDescription(exp.description)}</ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {projects.length > 0 && (
                <div>
                  <Title text="Projects" />
                  <div className="space-y-6">
                    {projects.map((proj, i) => (
                      <div key={i} className="bg-[#FAF5F0] p-4 rounded-lg border border-[#E88FA2]/20">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-bold text-gray-900 text-sm">{proj.title}</h3>
                          <div className="flex gap-2">
                            {proj.liveDemo && <a href={proj.liveDemo} className="text-[10px] font-bold text-white bg-[#D4577A] px-2 py-0.5 rounded">DEMO</a>}
                            {proj.github && <a href={proj.github} className="text-[10px] font-bold text-white bg-gray-800 px-2 py-0.5 rounded">CODE</a>}
                          </div>
                        </div>
                        <ul className="mt-2">{formatDescription(proj.description)}</ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Side Content */}
            <div className="col-span-4 space-y-8">
              {skills.length > 0 && (
                <div>
                  <Title text="Skills" />
                  <div className="flex flex-col gap-2">
                    {skills.map((s, i) => (
                      <div key={i} className="bg-gray-50 px-3 py-2 rounded text-[13px] font-bold text-gray-700 border border-gray-100 flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4577A] mr-2"></div>
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
                        <h3 className="font-bold text-gray-900 text-[13px]">{edu.degree}</h3>
                        <p className="text-[13px] text-gray-600 font-medium mb-1">{edu.institution}</p>
                        <div className="text-[11px] font-bold text-gray-400">
                          {formatYearMonth(edu.startDate)} - {formatYearMonth(edu.endDate)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {certifications.length > 0 && (
                <div>
                  <Title text="Certifications" />
                  <ul className="space-y-3">
                    {certifications.map((c, i) => (
                      <li key={i}>
                        <div className="font-bold text-gray-900 text-[13px]">{c.title}</div>
                        <div className="text-[#D4577A] text-[11px] font-bold mt-0.5">{c.issuer} {c.year && `• ${c.year}`}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSeven;
