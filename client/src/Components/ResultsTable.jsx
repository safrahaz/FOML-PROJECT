// eslint-disable-next-line no-unused-vars
import React from "react";

// eslint-disable-next-line react/prop-types
const ResultsTable = ({ results }) => {
  // Sort results in descending order (highest score first)
  const sortedResults = [...results].sort((a, b) => b.score - a.score);
  
  return (
    <div className="results-container">
      <h2>Ranked Candidates</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Rank</th>
            <th className="border p-2 text-left">Candidate</th>
            <th className="border p-2 text-left">Match Score</th>
            <th className="border p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedResults.map((res, index) => (
            <tr key={res.name} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{res.name}</td>
              <td className="border p-2">{res.score}%</td>
              <td className="border p-2">
                <button 
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  onClick={() => alert(`Viewing ${res.name}'s resume`)}
                >
                  🔍 View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;