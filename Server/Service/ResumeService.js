import { exec } from "child_process";
import path from "path";

const processUploads = (req, res) => {
  try {
    const jdPath = req.files["jobDescription"][0].path;
    const resumePaths = req.files["resumes"].map(file => file.path);

    const command = `python3 ML/resumeMatcher.py "${jdPath}" ${resumePaths.join(" ")}`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error("Python error:", stderr);
        return res.status(500).json({ error: "ML processing failed" });
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
    res.status(500).json({ error: "Server error" });
  }
};

export default { processUploads };
