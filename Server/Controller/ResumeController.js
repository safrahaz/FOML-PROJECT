import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import ResumeService from "../Service/ResumeService.js";

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = file.fieldname === "jobDescription" ? "uploads/jd" : "uploads/resumes";
  
    fs.mkdirSync(folder, { recursive: true });

    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });

// Route for uploading JD and multiple resumes
router.post(
  "/upload",
  upload.fields([
    { name: "jobDescription", maxCount: 1 },
    { name: "resumes", maxCount: 10 },
  ]),
  ResumeService.processUploads
);

export default router;
