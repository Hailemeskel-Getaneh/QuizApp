import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/pagesStyle/quizPage.css';

const UserPage = () => {
  const [categories, setCategories] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);

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
