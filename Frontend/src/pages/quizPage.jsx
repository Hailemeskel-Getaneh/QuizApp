import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/pagesStyle/quizPage.css';

const UserPage = () => {
  const [categories, setCategories] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token'); // Check token consistency
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
      console.log('Fetched quizzes:', response.data); // Log the response data for debugging
      if (response.data && Array.isArray(response.data)) {
        setQuizzes(response.data); // Assuming the response is an array of quizzes
      } else {
        console.error('Unexpected response format:', response.data);
        alert('Failed to load quizzes. Please try again later.');
      }
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      alert('An error occurred while fetching quizzes. Please try again later.');
    }
  };
  

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/quiz/${selectedCategory._id}`);
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchQuizzes();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchQuestions();
    }
  }, [selectedCategory]);

  return (
    
    <div>
     

      <h2>Quizzes</h2>
      <div className="quizzes-container">
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <div key={quiz._id} className="quiz-card" onClick={() => setSelectedCategory(quiz.categories[0])}>
              <h3>{quiz.quizName}</h3>
              <p>{quiz.categories.map((cat) => cat.name).join(', ')}</p>
              <p>{quiz.totalTime} minutes</p>
            </div>
          ))
        ) : (
          <p>No quizzes available at the moment.</p>
        )}
      </div>

      {selectedCategory && (
        <div className="questions-container">
          <h3>Questions for {selectedCategory.name}</h3>
          {questions.length > 0 ? (
            questions.map((question, index) => (
              <div key={index} className="question-card">
                <p>{question.questionText}</p>
                {/* Render question options */}
              </div>
            ))
          ) : (
            <p>No questions available for this category.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserPage;
