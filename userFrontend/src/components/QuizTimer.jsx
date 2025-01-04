import React, { useEffect, useState } from 'react';
import '../styles/componentstyle/QuizTimer.css';

const QuizTimer = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration); // Track remaining time

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp(); // Trigger when time is up
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 800);

    return () => clearInterval(timer); // Cleanup on unmount
  }, [timeLeft, onTimeUp]);

  // Format time in minutes and seconds
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="quiz-timer">
      <p>Time Left: {formatTime(timeLeft)}</p>
    </div>
  );
};

export default QuizTimer;
