import React, { useState, useEffect } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import '../styles/QuizManagement.css';

const QuizManagement = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [quizName, setQuizName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [totalTime, setTotalTime] = useState(30);
  const [passcode, setPasscode] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editQuizId, setEditQuizId] = useState('');

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
    const data = { quizName, categories: [selectedCategory], totalTime, passcode };
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
        setSelectedCategory('');
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

  // Handle quiz editing
  const handleEditQuiz = async () => {
    const data = { quizName, categories: [selectedCategory], totalTime, passcode };
    try {
      const response = await fetch(`http://localhost:4000/api/edit-quiz/${editQuizId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const updatedQuiz = await response.json();
        alert('Quiz updated successfully');
        fetchQuizzes();
        setIsEditing(false);
        setEditQuizId('');
        setQuizName('');
        setSelectedCategory('');
        setTotalTime(30);
        setPasscode('');
      } else {
        const errorData = await response.json();
        alert(`Failed to update quiz: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error updating quiz:', error);
      alert('Error updating quiz');
    }
  };
  
  // Update selected category
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Get category names based on IDs
  const getCategoryNames = (categories) => {
    return categories.map((category) => category.name).join(', ');
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
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            renderValue={(selected) => {
              const category = categories.find((cat) => cat._id === selected);
              return category ? category.name : 'Select a Category';
            }}
          >
            {categories.length === 0 ? (
              <MenuItem value="" disabled>
                Loading categories...
              </MenuItem>
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

        <TextField
          label="Passcode"
          variant="outlined"
          fullWidth
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          margin="normal"
        />

        <Button
          variant="contained"
          color="primary"
          onClick={isEditing ? handleEditQuiz : handleCreateQuiz}
          fullWidth
        >
          {isEditing ? 'Update Quiz' : 'Create Quiz'}
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
                <TableCell>Category</TableCell>
                <TableCell>Total Time</TableCell>
                <TableCell>Passcode</TableCell>
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
                    <TableCell>{quiz.passcode}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                          setIsEditing(true);
                          setEditQuizId(quiz._id);
                          setQuizName(quiz.quizName);
                          setSelectedCategory(quiz.categories[0]._id);
                          setTotalTime(quiz.totalTime);
                          setPasscode(quiz.passcode);
                        }}
                      >
                        <FaEdit /> Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDeleteQuiz(quiz._id)}
                      >
                        <FaTrash /> Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="5" align="center">
                    No quizzes available
                  </TableCell>
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