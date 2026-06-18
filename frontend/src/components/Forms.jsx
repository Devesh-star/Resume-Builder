"use client";

import { Inputs } from "./Inputs";
import { RatingInput } from "./ResumeSection";
import { Plus, Trash2 } from "lucide-react";

// Standardized styles for forms
const styles = {
  container: "bg-white border border-app-border rounded-2xl p-6 shadow-sm mb-6",
  heading: "text-xl font-bold text-text-main mb-6 pb-4 border-b border-app-border",
  item: "bg-app-bg border border-app-border rounded-xl p-5 relative group transition-all hover:border-primary/30 mb-4",
  textarea: "w-full text-sm text-text-main bg-white border border-app-border px-4 py-3 rounded-xl placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 resize-none",
  addButton: "btn-outline w-full py-3 mt-2 flex items-center justify-center gap-2 border-dashed bg-app-bg hover:bg-secondary",
  trashButton: "absolute top-4 right-4 p-2 text-text-muted hover:text-error hover:bg-error/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100",
  label: "block text-sm font-semibold text-text-main mb-1.5"
};

// LanguagesForm Component
export const LanguagesForm = ({ languages, updateArrayItem, addArrayItem, removeArrayItem }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Languages</h2>
      <div>
        {languages?.map((lang, index) => (
          <div key={index} className={styles.item}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <Inputs
                label="Language"
                placeholder="e.g. English"
                value={lang.name || ""}
                onChange={({ target }) => updateArrayItem("languages", index, "name", target.value)}
              />
              <div>
                <label className={styles.label}>Proficiency</label>
                <div className="mt-2">
                  <RatingInput
                    value={lang.progress || 0}
                    total={5}
                    color="#7C3AED"
                    bgColor="#E5E7EB"
                    onChange={(value) => updateArrayItem("languages", index, "progress", value)}
                  />
                </div>
              </div>
            </div>
            {languages.length > 1 && (
              <button
                type="button"
                className={styles.trashButton}
                onClick={() => removeArrayItem("languages", index)}
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          className={styles.addButton}
          onClick={() => addArrayItem("languages", { name: "", progress: 0 })}
        >
          <Plus size={18} /> Add Language
        </button>
      </div>
    </div>
  );
};

// InterestsForm Component
export const InterestsForm = ({ interests, updateArrayItem, addArrayItem, removeArrayItem }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Interests</h2>
      <div>
        {interests?.map((interest, index) => (
          <div key={index} className={styles.item}>
            <Inputs
              label={`Interest ${index + 1}`}
              placeholder="e.g. Reading, Photography"
              value={interest || ""}
              onChange={({ target }) => updateArrayItem("interests", index, null, target.value)}
            />
            {interests.length > 1 && (
              <button
                type="button"
                className={styles.trashButton}
                onClick={() => removeArrayItem("interests", index)}
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          className={styles.addButton}
          onClick={() => addArrayItem("interests", "")}
        >
          <Plus size={18} /> Add Interest
        </button>
      </div>
    </div>
  );
};

// CertificationInfoForm Component
export const CertificationInfoForm = ({ certifications, updateArrayItem, addArrayItem, removeArrayItem }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Certifications</h2>
      <div>
        {certifications.map((cert, index) => (
          <div key={index} className={styles.item}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Inputs
                label="Certificate Title"
                placeholder="Full Stack Web Developer"
                value={cert.title || ""}
                onChange={({ target }) => updateArrayItem(index, "title", target.value)}
              />

              <Inputs
                label="Issuer"
                placeholder="Coursera / Google / etc."
                value={cert.issuer || ""}
                onChange={({ target }) => updateArrayItem(index, "issuer", target.value)}
              />

              <Inputs
                label="Year"
                placeholder="2024"
                value={cert.year || ""}
                onChange={({ target }) => updateArrayItem(index, "year", target.value)}
              />
            </div>

            {certifications.length > 1 && (
              <button
                type="button"
                className={styles.trashButton}
                onClick={() => removeArrayItem(index)}
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          className={styles.addButton}
          onClick={() =>
            addArrayItem({
              title: "",
              issuer: "",
              year: "",
            })
          }
        >
          <Plus size={18} /> Add Certification
        </button>
      </div>
    </div>
  );
};

// ContactInfoForm Component
export const ContactInfoForm = ({ contactInfo, updateSection }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Contact Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Inputs
            label="Address"
            placeholder="Short Address"
            value={contactInfo.location || ""}
            onChange={({ target }) => updateSection("location", target.value)}
          />
        </div>

        <Inputs
          label="Email"
          placeholder="john@example.com"
          type="email"
          value={contactInfo.email || ""}
          onChange={({ target }) => updateSection("email", target.value)}
        />

        <Inputs
          label="Phone Number"
          placeholder="1234567890"
          value={contactInfo.phone || ""}
          onChange={({ target }) => updateSection("phone", target.value)}
        />

        <Inputs
          label="LinkedIn"
          placeholder="https://linkedin.com/in/username"
          value={contactInfo.linkedin || ""}
          onChange={({ target }) => updateSection("linkedin", target.value)}
        />

        <Inputs
          label="GitHub"
          placeholder="https://github.com/username"
          value={contactInfo.github || ""}
          onChange={({ target }) => updateSection("github", target.value)}
        />

        <div className="md:col-span-2">
          <Inputs
            label="Portfolio / Website"
            placeholder="https://yourwebsite.com"
            value={contactInfo.website || ""}
            onChange={({ target }) => updateSection("website", target.value)}
          />
        </div>
      </div>
    </div>
  );
};

// EducationDetailsForm Component
export const EducationDetailsForm = ({ educationInfo, updateArrayItem, addArrayItem, removeArrayItem }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Education</h2>
      <div>
        {educationInfo.map((education, index) => (
          <div key={index} className={styles.item}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Inputs
                label="Degree"
                placeholder="BTech in Computer Science"
                value={education.degree || ""}
                onChange={({ target }) => updateArrayItem(index, "degree", target.value)}
              />

              <Inputs
                label="Institution"
                placeholder="XYZ University"
                value={education.institution || ""}
                onChange={({ target }) => updateArrayItem(index, "institution", target.value)}
              />

              <Inputs
                label="Start Date"
                type="month"
                value={education.startDate || ""}
                onChange={({ target }) => updateArrayItem(index, "startDate", target.value)}
              />

              <Inputs
                label="End Date"
                type="month"
                value={education.endDate || ""}
                onChange={({ target }) => updateArrayItem(index, "endDate", target.value)}
              />
            </div>
            {educationInfo.length > 1 && (
              <button
                type="button"
                className={styles.trashButton}
                onClick={() => removeArrayItem(index)}
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          className={styles.addButton}
          onClick={() =>
            addArrayItem({
              degree: "",
              institution: "",
              startDate: "",
              endDate: "",
            })
          }
        >
          <Plus size={18} /> Add Education
        </button>
      </div>
    </div>
  );
};

// ProfileInfoForm Component
export const ProfileInfoForm = ({ profileData, updateSection }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Personal Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Inputs
          label="Full Name"
          placeholder="John Doe"
          value={profileData.fullName || ""}
          onChange={({ target }) => updateSection("fullName", target.value)}
        />

        <Inputs
          label="Designation"
          placeholder="Full Stack Developer"
          value={profileData.designation || ""}
          onChange={({ target }) => updateSection("designation", target.value)}
        />

        <div className="md:col-span-2">
          <label className={styles.label}>Summary</label>
          <textarea
            className={styles.textarea}
            rows={4}
            placeholder="Short introduction about yourself"
            value={profileData.summary || ""}
            onChange={({ target }) => updateSection("summary", target.value)}
          />
        </div>
      </div>
    </div>
  );
};

// ProjectDetailForm Component
export const ProjectDetailForm = ({ projectInfo, updateArrayItem, addArrayItem, removeArrayItem }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Projects</h2>
      <div>
        {projectInfo.map((project, index) => (
          <div key={index} className={styles.item}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Inputs
                  label="Project Title"
                  placeholder="Portfolio Website"
                  value={project.title || ""}
                  onChange={({ target }) => updateArrayItem(index, "title", target.value)}
                />
              </div>

              <div className="md:col-span-2">
                <label className={styles.label}>Description</label>
                <textarea
                  placeholder="Short description about the project"
                  className={styles.textarea}
                  rows={3}
                  value={project.description || ""}
                  onChange={({ target }) => updateArrayItem(index, "description", target.value)}
                />
              </div>

              <Inputs
                label="GitHub Link"
                placeholder="https://github.com/username/project"
                value={project.github || ""}
                onChange={({ target }) => updateArrayItem(index, "github", target.value)}
              />

              <Inputs
                label="Live Demo URL"
                placeholder="https://yourproject.live"
                value={project.liveDemo || ""}
                onChange={({ target }) => updateArrayItem(index, "liveDemo", target.value)}
              />
            </div>

            {projectInfo.length > 1 && (
              <button
                type="button"
                className={styles.trashButton}
                onClick={() => removeArrayItem(index)}
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          className={styles.addButton}
          onClick={() =>
            addArrayItem({
              title: "",
              description: "",
              github: "",
              liveDemo: "",
            })
          }
        >
          <Plus size={18} /> Add Project
        </button>
      </div>
    </div>
  );
};

// SkillsInfoForm Component
export const SkillsInfoForm = ({ skillsInfo, updateArrayItem, addArrayItem, removeArrayItem }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Skills</h2>
      <div>
        {skillsInfo.map((skill, index) => (
          <div key={index} className={styles.item}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Inputs
                label="Skill Name"
                placeholder="JavaScript"
                value={skill.name || ""}
                onChange={({ target }) => updateArrayItem(index, "name", target.value)}
              />

              <div>
                <label className={styles.label}>
                  Proficiency ({skill.progress ? Math.round(skill.progress / 20) : 0}/5)
                </label>
                <div className="mt-2">
                  <RatingInput
                    value={skill.progress || 0}
                    total={5}
                    color="#7C3AED"
                    bgColor="#E5E7EB"
                    onChange={(newValue) => updateArrayItem(index, "progress", newValue)}
                  />
                </div>
              </div>
            </div>

            {skillsInfo.length > 1 && (
              <button
                type="button"
                className={styles.trashButton}
                onClick={() => removeArrayItem(index)}
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          className={styles.addButton}
          onClick={() =>
            addArrayItem({
              name: "",
              progress: 0,
            })
          }
        >
          <Plus size={18} /> Add Skill
        </button>
      </div>
    </div>
  );
};

// WorkExperienceForm Component
export const WorkExperienceForm = ({ workExperience, updateArrayItem, addArrayItem, removeArrayItem }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Work Experience</h2>
      <div>
        {workExperience.map((experience, index) => (
          <div key={index} className={styles.item}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Inputs
                label="Company"
                placeholder="ABC Corp"
                value={experience.company || ""}
                onChange={({ target }) => updateArrayItem(index, "company", target.value)}
              />

              <Inputs
                label="Role"
                placeholder="Frontend Developer"
                value={experience.role || ""}
                onChange={({ target }) => updateArrayItem(index, "role", target.value)}
              />

              <Inputs
                label="Start Date"
                type="month"
                value={experience.startDate || ""}
                onChange={({ target }) => updateArrayItem(index, "startDate", target.value)}
              />

              <Inputs
                label="End Date"
                type="month"
                value={experience.endDate || ""}
                onChange={({ target }) => updateArrayItem(index, "endDate", target.value)}
              />
            </div>

            <div className="mt-6">
              <label className={styles.label}>Description</label>
              <textarea
                placeholder="What did you do in this role?"
                className={styles.textarea}
                rows={3}
                value={experience.description || ""}
                onChange={({ target }) => updateArrayItem(index, "description", target.value)}
              />
            </div>

            {workExperience.length > 1 && (
              <button
                type="button"
                className={styles.trashButton}
                onClick={() => removeArrayItem(index)}
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          className={styles.addButton}
          onClick={() =>
            addArrayItem({
              company: "",
              role: "",
              startDate: "",
              endDate: "",
              description: "",
            })
          }
        >
          <Plus size={18} /> Add Work Experience
        </button>
      </div>
    </div>
  );
};

// CustomSectionForm Component
export const CustomSectionForm = ({ customSection, updateSection, updateArrayItem, addArrayItem, removeArrayItem }) => {
  return (
    <div className={styles.container}>
      <div className="flex items-center gap-4 mb-6">
        <Inputs
          placeholder="Section Title (e.g. Awards)"
          value={customSection.title || ""}
          onChange={({ target }) => updateSection("title", target.value)}
        />
      </div>
      <div>
        {customSection.items?.map((item, index) => (
          <div key={index} className={styles.item}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Inputs
                label="Item Title"
                placeholder="e.g. Best Developer Award"
                value={item.title || ""}
                onChange={({ target }) => updateArrayItem(index, "title", target.value)}
              />

              <Inputs
                label="Subtitle"
                placeholder="e.g. Hackathon 2023"
                value={item.subtitle || ""}
                onChange={({ target }) => updateArrayItem(index, "subtitle", target.value)}
              />

              <div className="md:col-span-2">
                <Inputs
                  label="Date / Duration"
                  placeholder="e.g. Oct 2023"
                  value={item.date || ""}
                  onChange={({ target }) => updateArrayItem(index, "date", target.value)}
                />
              </div>
            </div>

            <div className="mt-6">
              <label className={styles.label}>Description</label>
              <textarea
                placeholder="Short description..."
                className={styles.textarea}
                rows={3}
                value={item.description || ""}
                onChange={({ target }) => updateArrayItem(index, "description", target.value)}
              />
            </div>

            {customSection.items.length > 1 && (
              <button
                type="button"
                className={styles.trashButton}
                onClick={() => removeArrayItem(index)}
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          className={styles.addButton}
          onClick={() =>
            addArrayItem({
              title: "",
              subtitle: "",
              date: "",
              description: "",
            })
          }
        >
          <Plus size={18} /> Add Item
        </button>
      </div>
    </div>
  );
};