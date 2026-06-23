import Resume from '../models/resumeModel.js'
import fs from 'fs'
import path from 'path'
import { createRequire } from 'module';
import { GoogleGenerativeAI } from '@google/generative-ai';

const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');
// import { threadCpuUsage } from 'process'

export const createResume = async (req, res) => {
    try {
        const { title } = req.body 

        const defaultResumeData = {
            profileInfo: {
                profileImg: null,
                previewUrl: '',
                fullName: '',
                designation: '',
                summary: '',
            },
            contactInfo: {
                email: '',
                phone: '',
                location: '',
                linkedin: '',
                github: '',
                website: '',
            },
            workExperience: [
                {
                    company: '',
                    role: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                },
            ],
            education: [
                {
                    degree: '',
                    institution: '',
                    startDate: '',
                    endDate: '',
                },
            ],
            skills: [
                {
                    name: '',
                    progress: 0,
                },
            ],
            projects: [
                {
                    title: '',
                    description: '',
                    github: '',
                    liveDemo: '',
                },
            ],
            certifications: [
                {
                    title: '',
                    issuer: '',
                    year: '',
                },
            ],
            languages: [
                {
                    name: '',
                    progress: 0,
                },
            ],
            interests: [''],
        };

        const newResume = await Resume.create ({
            userId: req.user._id,
            title,
            ...defaultResumeData,
            ...req.body
        })
        res.status(201).json(newResume)

    } catch (error) {
        res.status(500).json({ message: "Failed to create resume", error: error.message })
    }
}

export const getUserResumes = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    const resumes = await Resume
      .find({ userId: req.user._id })
      .sort({ updatedAt: -1 })

    res.json(resumes)
  } catch (error) {
    console.error("GET RESUME ERROR:", error)
    res.status(500).json({ message: "Failed to get resumes", error: error.message })
  }
}

export const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id})

        if(!resume){
            return res.status(404).json({ message: "Resume not found" })
        }
        res.json(resume)
    } catch (error) {
        res.status(500).json({ message: "Failed to get resumes", error: error.message})
    }
}

export const updateResume = async(req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            userId: req.user._id
        })
        if(!resume){
            return res.status(404).json({ message: "Resume not found or not authorized" })
        }

        // merge updated resumes
        const updates = req.body
        delete updates.user
        delete updates._id  
        Object.assign(resume, updates)

        // save updated resumes
        const savedResume = await resume.save()
        res.json(savedResume)
    } catch (error) {
        res.status(500).json({ message: "Failed to get resumes", error: error.message})
    }
}

export const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            userId: req.user._id
        })
        if(!resume){
            return res.status(404).json({ message: "Resume not found or not authorized" })
        }

        // create upload folder and store resume thre
        const uploadsFolder = path.join(process.cwd(), 'uploads')

        // delete thumbnail function
        if(resume.thumbnailLink) {
            const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink))
            if(fs.existsSync(oldThumbnail)){
                fs.unlinkSync(oldThumbnail)
            }
        }

        if(resume.profileInfo?.profilePreviewUrl){
            const oldProfile = path.join(
                uploadsFolder,
                path.basename(resume.profileInfo.profilePreviewUrl)
            )
            if(fs.existsSync(oldProfile)){
                fs.unlinkSync(oldProfile)
            }
        }

        const deleted = await Resume.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        })
        if(!deleted){
            return res.status(404).json({ message: "Resume not found or not authorized" })
        }
        res.json({ message: "Resume deleted successfully."})

    } catch (error) {
        res.status(500).json({ message: "Failed to delete resumes", error: error.message})
    }
}

export const parsePdfResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No PDF file uploaded" });
        }
        
        const data = await pdf(req.file.buffer);
        res.status(200).json({ text: data.text });
    } catch (error) {
        console.error("Error parsing PDF:", error);
        res.status(500).json({ message: "Failed to parse PDF", error: error.message });
    }
}

export const generateAtsReport = async (req, res) => {
    try {
        const { resumeText, jobDescription } = req.body;
        if (!resumeText || !jobDescription) {
            return res.status(400).json({ message: "Missing resumeText or jobDescription" });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ message: "GEMINI_API_KEY is not configured in the server." });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash",
            generationConfig: { responseMimeType: "application/json" }
        });

        const prompt = `You are an expert ATS (Applicant Tracking System) and technical recruiter.
I will provide you with a Resume Text and a Job Description. 
You need to analyze the match between the resume and the job description and provide a JSON response EXACTLY matching this structure, with no markdown formatting around it:
{
    "score": <number 0-100 representing the match percentage>,
    "matched": [<array of key skills/keywords found in both>],
    "missing": [<array of key skills/keywords from the JD missing in the resume>],
    "actionVerbs": "<either 'Excellent', 'Good', or 'Needs Work' based on the use of strong action verbs>",
    "feedback": "<A brief, 2-3 sentence personalized feedback paragraph on how to improve the resume for this specific role>"
}

Resume Text:
${resumeText}

Job Description:
${jobDescription}

JSON Response:`;

        const result = await model.generateContent(prompt);
        let responseText = result.response.text().trim();
        
        // Clean up markdown block if present
        if (responseText.startsWith('\`\`\`json')) {
            responseText = responseText.substring(7, responseText.length - 3).trim();
        } else if (responseText.startsWith('\`\`\`')) {
            responseText = responseText.substring(3, responseText.length - 3).trim();
        }

        const parsedData = JSON.parse(responseText);
        res.status(200).json(parsedData);

    } catch (error) {
        console.error("Error generating ATS report:", error);
        res.status(500).json({ message: "Failed to generate ATS report", error: error.message });
    }
}