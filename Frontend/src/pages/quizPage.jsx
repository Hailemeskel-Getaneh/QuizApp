import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/pagesStyle/quizPage.css';

const UserPage = () => {
  const [categories, setCategories] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [passcode, setPasscode] = useState('');
  const [validPasscode, setValidPasscode] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

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

  // Handle passcode validation
  const handlePasscodeSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/validate-passcode', {
        categoryId: selectedCategory._id,
        passcode,
      });

      if (response.status === 200) {
        setValidPasscode(true);
        setErrorMessage('');
        fetchQuestions();
      }
    } catch (error) {
      setErrorMessage('Invalid passcode');
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

      {selectedCategory && !validPasscode && (
        <div className="passcode-container">
          <h3>Enter Passcode for {selectedCategory.name}</h3>
          <form onSubmit={handlePasscodeSubmit}>
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter Passcode"
              required
            />
            <button type="submit">Submit</button>
          </form>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
      )}

      {validPasscode && questions.length > 0 && (
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
