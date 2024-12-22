import React, { useState } from "react";
import Timer from "./Timer";

const Quiz = ({ questions, onSubmit }) => {
  const [answers, setAnswers] = useState({});

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleSubmit = () => {
    onSubmit(answers);
  };

  const handleTimeUp = () => {
    alert("Time's up! Submitting your quiz.");
    handleSubmit();
  };

  return (
    <div>
      <Timer initialTime={300} onTimeUp={handleTimeUp} /> {/* 5-minute timer */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {questions.map((question) => (
          <div key={question.id}>
            <p>{question.question_text}</p>
            {Object.entries(question.options).map(([key, option]) => (
              <div key={key}>
                <input
                  type="radio"
                  name={question.id}
                  value={key}
                  onChange={() => handleAnswerChange(question.id, key)}
                />
                {option}
              </div>
            ))}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Quiz;
