import React, { useEffect, useState } from 'react';
import '../styles/pagesStyle/resultPage.css';

const ResultPage = ({ userId }) => {
  const [result, setResult] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch result and leaderboard
  useEffect(() => {
    const fetchResultAndLeaderboard = async () => {
      try {
        setLoading(true);

        // Fetch user result
        const resultResponse = await fetch(`http://localhost:4000/api/result/${userId}`);
        if (!resultResponse.ok) throw new Error('Failed to fetch user result');
        const resultData = await resultResponse.json();

        // Fetch leaderboard
        const leaderboardResponse = await fetch('http://localhost:4000/api/leaderboard');
        if (!leaderboardResponse.ok) throw new Error('Failed to fetch leaderboard');
        const leaderboardData = await leaderboardResponse.json();

        setResult(resultData);
        setLeaderboard(leaderboardData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResultAndLeaderboard();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="result-page">
      <h2>Quiz Results</h2>

      {result && (
        <div className="result-section">
          <h3>Your Result</h3>
          <p><strong>Score:</strong> {result.score} / {result.totalQuestions}</p>
          <p><strong>Percentage:</strong> {(result.score / result.totalQuestions * 100).toFixed(2)}%</p>
          <p><strong>Time Taken:</strong> {result.timeTaken} minutes</p>
        </div>
      )}

      <div className="leaderboard-section">
        <h3>Leaderboard</h3>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
              <th>Time Taken</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.length > 0 ? (
              leaderboard.map((entry, index) => (
                <tr key={entry.userId}>
                  <td>{index + 1}</td>
                  <td>{entry.name}</td>
                  <td>{entry.score}</td>
                  <td>{entry.timeTaken} minutes</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No leaderboard data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultPage;