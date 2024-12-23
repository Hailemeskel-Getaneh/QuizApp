import React, { useState, useEffect } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import '../styles/QuizManagement.css';

const QuizManagement = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [quizName, setQuizName] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalTime, setTotalTime] = useState(30);
  const [Passcode, setPasscode] = useState('');

  // Fetch existing quizzes
  const fetchQuizzes = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/quizzes');
      if (!response.ok) throw new Error('Failed to fetch quizzes');
      const data = await response.json();
      setQuizzes(data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  // Fetch categories for dropdown
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Handle quiz creation
  const handleCreateQuiz = async () => {
    const data = { quizName, selectedCategories, totalTime, Passcode };
    try {
      const response = await fetch('http://localhost:4000/api/create-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        alert('Quiz created successfully');
        fetchQuizzes();
        setQuizName('');
        setSelectedCategories([]);
        setTotalTime(30);
        setPasscode('');
      } else {
        const errorData = await response.json();
        alert(`Failed to create quiz: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error creating quiz:', error);
      alert('Error creating quiz');
    }
  };
  
  // Handle quiz deletion
  const handleDeleteQuiz = async (quizId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/delete-quiz/${quizId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Quiz deleted successfully');
        fetchQuizzes();
      } else {
        alert('Failed to delete quiz');
      }
    } catch (error) {
      console.error('Error deleting quiz:', error);
      alert('Error deleting quiz');
    }
  };

  // Update selected categories
  const handleCategoryChange = (event) => {
    const { options } = event.target;
    const selected = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setSelectedCategories(selected);
  };

  useEffect(() => {
    fetchQuizzes();
    fetchCategories();
  }, []);

  return (
    <div className="quiz-management">
      <h2>Quiz Management</h2>

      {/* Create Quiz Form */}
      <div className="create-quiz">
        <input
          type="text"
          value={quizName}
          onChange={(e) => setQuizName(e.target.value)}
          placeholder="Enter quiz name"
        />

        <select
          multiple
          value={selectedCategories}
          onChange={handleCategoryChange}
        >
          {categories.length === 0 && (
            <option value="" disabled>
              Loading categories...
            </option>
          )}
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          value={totalTime}
          onChange={(e) => setTotalTime(e.target.value)}
          placeholder="Total quiz time (minutes)"
        />
        <input
          type="String"
          value={Passcode}
          onChange={(e) => setPasscode(e.target.value)}
          placeholder="enter pass code"
        />
        <button onClick={handleCreateQuiz}>Create Quiz</button>
      </div>

      {/* Quiz List */}
      <div className="quiz-list">
        <h3>Existing Quizzes</h3>
        <table>
          <thead>
            <tr>
              <th>Quiz Name</th>
              <th>Categories</th>
              <th>Total Time</th>
              <th>Passcode</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.length > 0 ? (
              quizzes.map((quiz) => (
                <tr key={quiz._id}>
                  <td>{quiz.quizName}</td>
                  <td>{quiz.categories.map((cat) => cat.name).join(', ')}</td>
                  <td>{quiz.totalTime} minutes</td>
                  <td>{quiz.passcode} </td>
                  <td>
                    <button onClick={() => alert('Edit functionality to be implemented')}>
                      <FaEdit /> Edit
                    </button>
                    <button onClick={() => handleDeleteQuiz(quiz._id)}>
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No quizzes available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuizManagement;
