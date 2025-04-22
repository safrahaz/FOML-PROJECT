import React from "react";


const ResultsTable = ({ results }) => {
  return (
    <div className="results-container">
      <h2>Ranked Candidates</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Candidate</th>
            <th>Match Score</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {results.map((res, index) => (
            <tr key={res.name}>
              <td>{index + 1}</td>
              <td>{res.name}</td>
              <td>{res.score} %</td>
              <td>
                <button onClick={() => alert(`Viewing ${res.name}'s resume`)}>
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
