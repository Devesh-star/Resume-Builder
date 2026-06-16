import React, { useEffect, useRef, useState } from "react";
import { formatYearMonth } from "../utils/helper";

const Title = ({ text }) => (
  <div className="mb-2 mt-4">
    <h2 className="text-sm font-bold uppercase tracking-widest text-black border-b-[1.5px] border-black pb-1 mb-2">
      {text}
    </h2>
  </div>
);

const TemplateOne = ({ resumeData = {}, containerWidth }) => {
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

  // Format bullet points from a single text block
  const formatDescription = (desc) => {
    if (!desc) return null;
    return desc.split('\n').filter(line => line.trim().length > 0).map((line, i) => (
      <li key={i} className="ml-4 list-disc text-sm text-black leading-snug mb-1">
        {line.replace(/^-/, '').trim()}
      </li>
    ));
  };

  return (
    <div
      ref={resumeRef}
      className="p-8 bg-white font-serif text-black min-h-[1056px]"
      style={{
        transform: containerWidth > 0 ? `scale(${scale})` : undefined,
        transformOrigin: "top left",
        width: containerWidth > 0 ? `${baseWidth}px` : undefined,
      }}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold uppercase text-black tracking-wider mb-2">
          {profileInfo.fullName}
        </h1>
        
        <div className="flex flex-wrap justify-center items-center gap-2 text-sm text-black">
          {contactInfo.location && <span>{contactInfo.location}</span>}
          
          {(contactInfo.location && contactInfo.phone) && <span className="mx-1">•</span>}
          {contactInfo.phone && <span>{contactInfo.phone}</span>}
          
          {(contactInfo.phone && contactInfo.email) && <span className="mx-1">•</span>}
          {contactInfo.email && (
            <a href={`mailto:${contactInfo.email}`} className="hover:underline">
              {contactInfo.email}
            </a>
          )}
          
          {((contactInfo.phone || contactInfo.email) && contactInfo.linkedin) && <span className="mx-1">•</span>}
          {contactInfo.linkedin && (
            <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
              LinkedIn
            </a>
          )}
          
          {(contactInfo.linkedin && contactInfo.github) && <span className="mx-1">•</span>}
          {contactInfo.github && (
            <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
              GitHub
            </a>
          )}
          
          {(contactInfo.github && contactInfo.website) && <span className="mx-1">•</span>}
          {contactInfo.website && (
            <a href={contactInfo.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
              Portfolio
            </a>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {profileInfo.summary && (
        <div>
          <Title text="Professional Summary" />
          <p className="text-sm leading-relaxed text-black mb-4">
            {profileInfo.summary}
          </p>
        </div>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <div>
          <Title text="Professional Experience" />
          <div className="space-y-4">
            {workExperience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-base text-black">{exp.company}</h3>
                  <span className="text-sm font-bold text-black">
                    {formatYearMonth(exp.startDate)} – {formatYearMonth(exp.endDate)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mb-1">
                  <p className="italic text-sm text-black">{exp.role}</p>
                </div>
                <ul className="mt-1">
                  {formatDescription(exp.description)}
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
          <div className="space-y-3">
            {education.map((edu, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-base text-black">{edu.institution}</h3>
                  <span className="text-sm font-bold text-black">
                    {formatYearMonth(edu.startDate)} – {formatYearMonth(edu.endDate)}
                  </span>
                </div>
                <p className="italic text-sm text-black">{edu.degree}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div>
          <Title text="Projects" />
          <div className="space-y-3">
            {projects.map((proj, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-sm text-black">
                    {proj.title}
                    {proj.liveDemo && (
                      <a href={proj.liveDemo} className="ml-2 text-xs font-normal underline">Live Demo</a>
                    )}
                    {proj.github && (
                      <a href={proj.github} className="ml-2 text-xs font-normal underline">GitHub</a>
                    )}
                  </h3>
                </div>
                <ul className="mt-1">
                  {formatDescription(proj.description)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Additional Section: Skills, Certifications, Languages */}
      {(skills.length > 0 || certifications.length > 0 || languages.length > 0 || interests.length > 0) && (
        <div>
          <Title text="Additional Information" />
          <div className="text-sm text-black space-y-1">
            {skills.length > 0 && (
              <p>
                <span className="font-bold">Technical Skills: </span>
                {skills.map(s => s.name).join(", ")}
              </p>
            )}
            
            {certifications.length > 0 && (
              <p>
                <span className="font-bold">Certifications: </span>
                {certifications.map(c => `${c.title} (${c.issuer}${c.year ? `, ${c.year}` : ''})`).join(" • ")}
              </p>
            )}
            
            {languages.length > 0 && (
              <p>
                <span className="font-bold">Languages: </span>
                {languages.map(l => l.name).join(", ")}
              </p>
            )}
            
            {interests.length > 0 && interests.some(i => i) && (
              <p>
                <span className="font-bold">Interests: </span>
                {interests.filter(i => i).join(", ")}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateOne;