// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const UploadForm = ({ setResults }) => {
  const [jdFile, setJdFile] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData();
    formData.append("jobDescription", jdFile);
    
    // Ensure each resume file is properly appended to formData
    for (let i = 0; i < resumes.length; i++) {
      formData.append("resumes", resumes[i]);
    }

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="upload-form p-4 border rounded shadow-sm">
      <div className="mb-4">
        <label className="block mb-2 font-medium">Upload Job Description:</label>
        <input
          type="file"
          onChange={(e) => setJdFile(e.target.files[0])}
          className="w-full border p-2 rounded"
          accept=".pdf"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block mb-2 font-medium">Upload Resumes (multiple):</label>
        <input
          type="file"
          multiple
          onChange={(e) => setResumes(Array.from(e.target.files))}
          className="w-full border p-2 rounded"
          accept=".pdf"
          required
        />
        {resumes.length > 0 && (
          <div className="mt-2 text-sm text-gray-600">
            {resumes.length} file(s) selected
          </div>
        )}
      </div>
      
      <button 
        type="submit" 
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Processing..." : "Submit"}
      </button>
    </form>
  );
};

export default UploadForm;