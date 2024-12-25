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

  const handleLogin = () => {
    // After successful login
    setIsLoggedIn(true); // A state that indicates the user has logged in
  };
  
  

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login page if not authenticated
    }
  }, [navigate]);

  // Logout logic
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

<<<<<<< HEAD
  const fetchQuizzes = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/quizzes'); // Adjust endpoint as necessary
=======
  // Fetch all quizzes on page load
  const fetchQuizzes = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/quizzes');
>>>>>>> 72fd831d9b2072666a77032e292358f32ac8bc01
      setQuizzes(response.data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

<<<<<<< HEAD
  useEffect(() => {
    fetchQuizzes();
  }, []);
=======

  
  // Example for fetching questions and passing to QuizCard
const fetchQuestions = async (quizId, enteredPasscode) => {
  try {
    const response = await axios.post(`http://localhost:4000/api/quiz/${quizId}/questions`, {
      passcode: enteredPasscode,
    });
    if (response.data && response.data.length > 0) {
      setQuestions(response.data);
      setMessage('');
      // Redirect to QuizCard component
      navigate(`/quiz/${quizId}`,
         { state: { questions: response.data, quizName: selectedQuiz.quizName,  options:selectedQuiz.options } });
    } else {
      setMessage('No questions available.');
    }
  } catch (error) {
    setMessage('Incorrect passcode or failed to fetch questions.');
    console.error('Error fetching questions:', error);
  }
};

>>>>>>> 72fd831d9b2072666a77032e292358f32ac8bc01

  // Trigger when a user clicks on a quiz
  const handleQuizClick = (quiz) => {
    setSelectedQuiz(quiz);
    setShowPasscodeModal(true);
  };

  // Handle passcode submission and fetch questions
  const handlePasscodeSubmit = (e) => {
    e.preventDefault();
    if (selectedQuiz) {
<<<<<<< HEAD
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
=======
      fetchQuestions(selectedQuiz._id, passcode); // Fetch questions and redirect to the quiz card
>>>>>>> 72fd831d9b2072666a77032e292358f32ac8bc01
      setShowPasscodeModal(false);
    }
  };

  // Load quizzes on page load
  useEffect(() => {
    fetchQuizzes();
  }, []);

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
            <h3>Enter Passcode for {selectedQuiz?.quizName}</h3>
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
<<<<<<< HEAD
=======

      {/* Optionally, you can display questions here, but it's better to navigate to another page */}
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
>>>>>>> 72fd831d9b2072666a77032e292358f32ac8bc01
    </div>
  );
};

export default UserPage;
