import express from 'express';
import {protect} from '../middleware/authMiddleware.js';
import {createResume, deleteResume, getResumeById, getUserResumes, updateResume, parsePdfResume} from '../controllers/resumeController.js'
import {uploadResumeImages} from '../controllers/uploadImages.js'
import multer from 'multer';

const pdfUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error("Only PDF files are allowed"), false);
  }
});

const resumeRouter = express.Router();
resumeRouter.post("/parse-pdf", protect, pdfUpload.single('resume'), parsePdfResume);
resumeRouter.post("/", protect, createResume);
resumeRouter.get("/", protect, getUserResumes);
resumeRouter.get("/:id", protect, getResumeById);
resumeRouter.put("/:id", protect, updateResume);
resumeRouter.put("/:id/upload-images", protect, uploadResumeImages);
resumeRouter.delete("/:id", protect, deleteResume);

export default resumeRouter;