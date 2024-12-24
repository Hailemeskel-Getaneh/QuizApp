import React, { useState, useEffect } from 'react';
import '../styles/componentstyle/quizCard.css';

const QuizCard = ({ quizId }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/questions/${quizId}`);
        if (!response.ok) throw new Error('Failed to fetch questions');
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [quizId]);

  const handleOptionChange = (questionId, option) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: option,
    }));
  };

  const handleSubmit = () => {
    console.log('Selected answers:', answers);
    // Add logic to send the selected answers to the backend if needed
  };

  return (
    <div className="quiz-card">
      {loading ? (
        <p>Loading questions...</p>
      ) : questions.length > 0 ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {questions.map((question, index) => (
            <div key={question._id} className="question-item">
              <h4>
                {index + 1}. {question.questionText}
              </h4>
              <div className="options">
                {question.options.map((option, idx) => (
                  <label key={idx} className="option-label">
                    <input
                      type="radio"
                      name={`question-${question._id}`}
                      value={option}
                      checked={answers[question._id] === option}
                      onChange={() => handleOptionChange(question._id, option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      ) : (
        <p>No questions available for this quiz.</p>
      )}
    </div>
  );
};

export default QuizCard;
