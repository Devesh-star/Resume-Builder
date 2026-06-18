// Basic heuristic ATS scoring utility

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by', 'for', 'if', 'in', 'into', 'is', 'it',
  'no', 'not', 'of', 'on', 'or', 'such', 'that', 'the', 'their', 'then', 'there', 'these',
  'they', 'this', 'to', 'was', 'will', 'with', 'you', 'your', 'we', 'our', 'us', 'i', 'my', 'me',
  'he', 'she', 'him', 'her', 'his', 'hers', 'about', 'above', 'after', 'against', 'between',
  'during', 'through', 'under', 'before', 'from', 'have', 'has', 'had', 'do', 'does', 'did',
  'can', 'could', 'would', 'should', 'experience', 'years', 'looking', 'seeking', 'job', 'role',
  'team', 'company', 'work', 'working', 'skills', 'required', 'preferred', 'must', 'strong',
  'good', 'excellent', 'ability', 'able', 'knowledge', 'understanding', 'using'
]);

const extractResumeText = (resume) => {
  let text = [];

  // Profile Info
  if (resume.profileInfo?.summary) text.push(resume.profileInfo.summary);
  if (resume.profileInfo?.designation) text.push(resume.profileInfo.designation);

  // Experience
  if (resume.workExperiences) {
    resume.workExperiences.forEach(exp => {
      if (exp.role) text.push(exp.role);
      if (exp.description) text.push(exp.description);
    });
  }

  // Education
  if (resume.education) {
    resume.education.forEach(edu => {
      if (edu.degree) text.push(edu.degree);
      if (edu.institution) text.push(edu.institution);
    });
  }

  // Skills
  if (resume.skills) {
    resume.skills.forEach(skill => {
      if (skill.name) text.push(skill.name);
    });
  }

  // Projects
  if (resume.projects) {
    resume.projects.forEach(proj => {
      if (proj.title) text.push(proj.title);
      if (proj.description) text.push(proj.description);
    });
  }
  
  // Custom Sections
  if (resume.customSections) {
    resume.customSections.forEach(section => {
      section.items?.forEach(item => {
        if (item.title) text.push(item.title);
        if (item.description) text.push(item.description);
      });
    });
  }

  return text.join(' ').toLowerCase();
};

const extractKeywords = (text) => {
  if (!text) return [];
  // Basic tokenization: split by non-alphanumeric, convert to lowercase
  const words = text.toLowerCase().split(/[^a-z0-9#+.-]+/);
  
  const keywords = new Set();
  words.forEach(word => {
    if (word.length > 2 && !STOP_WORDS.has(word)) {
      keywords.add(word);
    }
  });
  
  return Array.from(keywords);
};

export const calculateATSScore = (resumeData, jobDescription) => {
  if (!resumeData || !jobDescription) {
    return { score: 0, matched: [], missing: [], formatting: true, actionVerbs: 'Moderate' };
  }

  const resumeText = extractResumeText(resumeData);
  const jdKeywords = extractKeywords(jobDescription);

  if (jdKeywords.length === 0) {
    return { score: 100, matched: [], missing: [], formatting: true, actionVerbs: 'Good' };
  }

  const matched = [];
  const missing = [];

  jdKeywords.forEach(keyword => {
    // If keyword exists in resume text
    // Using simple includes. For strict boundaries: new RegExp(`\\b${keyword}\\b`, 'i').test(resumeText)
    if (resumeText.includes(keyword)) {
      matched.push(keyword);
    } else {
      missing.push(keyword);
    }
  });

  // Score based purely on JD keyword density
  const score = Math.round((matched.length / jdKeywords.length) * 100);

  // Simple heuristic for action verbs (check if any of these common verbs exist)
  const actionVerbsList = ['developed', 'managed', 'created', 'led', 'designed', 'implemented', 'improved', 'increased', 'reduced', 'saved'];
  let verbCount = 0;
  actionVerbsList.forEach(verb => {
    if (resumeText.includes(verb)) verbCount++;
  });
  
  let actionVerbsStatus = 'Needs Work';
  if (verbCount > 5) actionVerbsStatus = 'Excellent';
  else if (verbCount > 2) actionVerbsStatus = 'Good';

  return {
    score,
    matched,
    missing: missing.slice(0, 15), // Don't return too many missing
    formatting: true, // App templates are always ATS-friendly
    actionVerbs: actionVerbsStatus
  };
};
