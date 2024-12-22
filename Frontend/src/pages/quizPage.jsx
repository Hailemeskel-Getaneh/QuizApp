import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/pagesStyle/quizPage.css';

const UserPage = () => {
  const [categories, setCategories] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  // Check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login'); // Redirect to login page if not logged in
    }
  }, [navigate]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove the token
    navigate('/login'); // Redirect to login page
  };

  // Fetch categories from the backend
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fetch quizzes from the backend
  const fetchQuizzes = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/quizzes'); // Adjust API route if needed
      setQuizzes(response.data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  // Fetch questions for selected category
  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/quiz/${selectedCategory._id}`);
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchQuizzes();
  }, []);

  return (
    <div>
      <button
        type="button"
        className="button-booking"
        style={{
          width: '80px',
          color: 'black',
          marginTop: '20px',
          marginLeft: '90%',
          alignItems: 'flex-end',
        }}
        onClick={handleLogout}
      >
        Logout
      </button>

      <h2>Quizzes</h2>
      <div className="quizzes-container">
        {quizzes.map((quiz) => (
          <div key={quiz._id} className="quiz-card" onClick={() => setSelectedCategory(quiz.categories[0])}>
            <h3>{quiz.quizName}</h3>
            <p>{quiz.categories.map((cat) => cat.name).join(', ')}</p>
            <p>{quiz.totalTime} minutes</p>
          </div>
        ))}
      </div>

      {selectedCategory && (
        <div className="questions-container">
          <h3>Questions for {selectedCategory.name}</h3>
          {questions.map((question, index) => (
            <div key={index} className="question-card">
              <p>{question.questionText}</p>
              {/* Render the options for each question here */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPage;
