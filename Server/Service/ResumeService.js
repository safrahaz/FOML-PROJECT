import { exec } from "child_process";
import path from "path";

const processUploads = (req, res) => {
  try {
    // Check if files exist in the request
    if (!req.files || !req.files["jobDescription"] || !req.files["resumes"]) {
      return res.status(400).json({ error: "Missing required files" });
    }

    const jdPath = req.files["jobDescription"][0].path;
    
    // Ensure resumes is always an array
    const resumeFiles = Array.isArray(req.files["resumes"]) 
      ? req.files["resumes"] 
      : [req.files["resumes"]];
    
    const resumePaths = resumeFiles.map(file => file.path);

    if (resumePaths.length === 0) {
      return res.status(400).json({ error: "No resume files uploaded" });
    }

    // Build command with proper quotation for paths (important for paths with spaces)
    const command = `python ML/resumeMatcher.py "${jdPath}" ${resumePaths.map(p => `"${p}"`).join(" ")}`;
    
    console.log("Executing:", command);
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error("Python error:", stderr);
        return res.status(500).json({ error: "ML processing failed", details: stderr });
      }

      try {
        const result = JSON.parse(stdout);
        res.json(result);
      } catch (err) {
        console.error("Invalid JSON from Python:", stdout);
        res.status(500).json({ error: "Invalid response from ML" });
      }
    });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

export default { processUploads };