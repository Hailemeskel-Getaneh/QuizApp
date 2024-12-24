import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/pagesStyle/quizPage.css';

const UserPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/quizzes'); // Adjust endpoint as necessary
      setQuizzes(response.data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleQuizClick = (quiz) => {
    setSelectedQuiz(quiz);
    setShowPasscodeModal(true);
  };

  const handlePasscodeSubmit = async (e) => {
    e.preventDefault();
    if (selectedQuiz) {
      try {
        const response = await axios.post(
          `http://localhost:4000/api/quiz/${selectedQuiz._id}/validate-passcode`,
          { passcode }
        );

        if (response.data.success) {
          navigate('/quizCard', { state: { quiz: selectedQuiz } });
        } else {
          setMessage('Incorrect passcode.');
        }
      } catch (error) {
        setMessage('Error validating passcode.');
        console.error('Error validating passcode:', error);
      }
      setShowPasscodeModal(false);
    }
  };

  return (
    <div>
      <h2>Quizzes</h2>
      <div className="quizzes-container">
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <div
              key={quiz._id}
              className="quiz-card"
              onClick={() => handleQuizClick(quiz)}
            >
              <h3>{quiz.quizName}</h3>
              <p>{quiz.categories.map((cat) => cat.name).join(', ')}</p>
              <p>{quiz.totalTime} minutes</p>
            </div>
          ))
        ) : (
          <p>No quizzes available at the moment.</p>
        )}
      </div>

      {showPasscodeModal && (
        <div className="passcode-modal">
          <form onSubmit={handlePasscodeSubmit}>
            <h3>Enter Passcode for {selectedQuiz.quizName}</h3>
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              required
              placeholder="Enter passcode"
            />
            <button type="submit">Submit</button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => setShowPasscodeModal(false)}
            >
              Cancel
            </button>
          </form>
          {message && <p>{message}</p>}
        </div>
      )}
    </div>
  );
};

export default UserPage;
