import React, { useState } from "react";
import axios from "axios";


const UploadForm = ({ setResults }) => {
  const [jdFile, setJdFile] = useState(null);
  const [resumes, setResumes] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("jobDescription", jdFile);
    resumes.forEach((file) => formData.append("resumes", file));

    try {
      const res = await axios.post("http://localhost:5000/resume/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResults(res.data);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading files. Please check the server.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="upload-form">
      <label>Upload Job Description:</label>
      <input
        type="file"
        onChange={(e) => setJdFile(e.target.files[0])}
        required
      />
      <label>Upload Resumes (multiple):</label>
      <input
        type="file"
        multiple
        onChange={(e) => setResumes(Array.from(e.target.files))}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UploadForm;
