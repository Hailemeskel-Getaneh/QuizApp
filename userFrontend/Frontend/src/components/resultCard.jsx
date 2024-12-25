// ResultCard.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const ResultCard = () => {
  const { score } = useParams(); // Get score from URL

  return (
    <div>
      <h2>Quiz Completed!</h2>
      <p>Your score: {score}</p>
    </div>
  );
};

export default ResultCard;
