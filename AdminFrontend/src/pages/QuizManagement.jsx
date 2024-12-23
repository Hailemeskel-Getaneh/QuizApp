import React, { useState, useEffect } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import '../styles/QuizManagement.css';

const QuizManagement = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [quizName, setQuizName] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalTime, setTotalTime] = useState(30);

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
    const data = { quizName, selectedCategories, totalTime };
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
      } else {
        alert('Failed to create quiz');
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
    const { value } = event.target;
    setSelectedCategories(value);
  };

  // Function to get category names based on selected category IDs
  const getCategoryNames = (categoryIds) => {
    return categoryIds.map(id => {
      const category = categories.find(cat => cat._id === id);
      return category ? category.name : 'Unknown';
    }).join(', ');
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
        <TextField
          label="Quiz Name"
          variant="outlined"
          fullWidth
          value={quizName}
          onChange={(e) => setQuizName(e.target.value)}
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Categories</InputLabel>
          <Select
            multiple
            value={selectedCategories}
            onChange={handleCategoryChange}
            renderValue={(selected) => {
              const categoryNames = getCategoryNames(selected);
              return categoryNames.length > 0 ? categoryNames : 'Select Categories';
            }}
          >
            {categories.length === 0 ? (
              <MenuItem value="" disabled>Loading categories...</MenuItem>
            ) : (
              categories.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.name}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>

        <TextField
          label="Total Quiz Time (minutes)"
          variant="outlined"
          fullWidth
          type="number"
          value={totalTime}
          onChange={(e) => setTotalTime(e.target.value)}
          margin="normal"
        />

        <Button variant="contained" color="primary" onClick={handleCreateQuiz} fullWidth>
          Create Quiz
        </Button>
      </div>

      {/* Quiz List */}
      <div className="quiz-list">
        <h3>Existing Quizzes</h3>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Quiz Name</TableCell>
                <TableCell>Categories</TableCell>
                <TableCell>Total Time</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quizzes.length > 0 ? (
                quizzes.map((quiz) => (
                  <TableRow key={quiz._id}>
                    <TableCell>{quiz.quizName}</TableCell>
                    <TableCell>{getCategoryNames(quiz.categories)}</TableCell>
                    <TableCell>{quiz.totalTime} minutes</TableCell>
                    <TableCell>
                      <Button variant="outlined" color="secondary" onClick={() => alert('Edit functionality to be implemented')}>
                        <FaEdit /> Edit
                      </Button>
                      <Button variant="outlined" color="error" onClick={() => handleDeleteQuiz(quiz._id)}>
                        <FaTrash /> Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="4" align="center">No quizzes available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default QuizManagement;
