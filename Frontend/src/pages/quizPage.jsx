import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import '../styles/pagesStyle/quizPage.css';

const UserPage = () => {
  const [categories, setCategories] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
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

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/quizzes'); // Make sure this endpoint is correct
      setQuizzes(response.data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  const fetchQuestions = async (quizId, enteredPasscode) => {
    try {
      const response = await axios.post(`http://localhost:4000/api/quiz/${quizId}/questions`, {
        passcode: enteredPasscode,
      });
      setQuestions(response.data);
      setMessage('');
    } catch (error) {
      setMessage('Incorrect passcode or failed to fetch questions.');
      console.error('Error fetching questions:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
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
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/quiz/${selectedQuiz._id}/questions`, {
          passcode,
        });
  
        // If successful, redirect to questions page
        const fetchedQuestions = response.data;
        navigate('/questions', { state: { questions: fetchedQuestions, quizName: selectedQuiz.quizName } });
      } catch (error) {
        setMessage('Incorrect passcode or failed to fetch questions.');
        console.error('Error fetching questions:', error);
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
            <Link to="/login">
              <button type="button" className="cancel-button">Cancel</button>
            </Link>
          </form>
          {message && <p>{message}</p>}
        </div>
      )}

      {questions.length > 0 && (
        <div className="questions-container">
          <h3>Questions</h3>
          {questions.map((question, index) => (
            <div key={index} className="question-card">
              <p>{question.questionText}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPage;
