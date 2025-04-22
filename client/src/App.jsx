import React, { useState } from "react";
import UploadForm from "./Components/UploadForm";
import ResultsTable from "./components/ResultsTable";
import "./App.css";

const App = () => {
  const [results, setResults] = useState([]);

  return (
    <div className="app-container">
      <h1>Intelligent Resume Screening System</h1>
      <UploadForm setResults={setResults} />
      <ResultsTable results={results} />
    </div>
  );
};

export default App;
