import express from "express";
import ResumeController from "./ResumeController.js";

const router = express.Router();
router.use("/resume", ResumeController);

export default router;
