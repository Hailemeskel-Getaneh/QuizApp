import React, { useState, useEffect } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import '../styles/QuestionManagement.css';

const QuestionManagement = ({ categoryId }) => {
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [timeLimit, setTimeLimit] = useState(30);
  const [totalQuizTime, setTotalQuizTime] = useState(0);
  const [editingQuestion, setEditingQuestion] = useState(null);

  // Fetch questions for the given category
  const fetchQuestions = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/questions/676578cd3d2250ff481726ff`);
      if (!response.ok) throw new Error('Failed to fetch questions');
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleAddOrUpdateQuestion = async () => {
    if (!categoryId) {
        alert('Please select a category before adding a question.');
        return;
    }

    const data = { categoryId, questionText, options, correctAnswer, timeLimit };

    try {
        const endpoint = editingQuestion
            ? `http://localhost:4000/api/update-question/${editingQuestion._id}`
            : 'http://localhost:4000/api/add-question';

        const method = editingQuestion ? 'PUT' : 'POST';

        const response = await fetch(endpoint, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert(editingQuestion ? 'Question updated successfully' : 'Question added successfully');
            fetchQuestions();
            resetForm();
        } else {
            alert('Failed to process the question');
        }
    } catch (error) {
        console.error('Error processing question:', error);
        alert('Error processing question');
    }
};

  const handleDeleteQuestion = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/delete-question/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Question deleted successfully');
        fetchQuestions();
      } else {
        alert('Failed to delete question');
      }
    } catch (error) {
      console.error('Error deleting question:', error);
      alert('Error deleting question');
    }
  };

  const handleSetTotalQuizTime = async () => {
    try {
      const data = { categoryId, totalQuizTime };
      const response = await fetch('http://localhost:4000/api/set-total-quiz-time', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert(`Total quiz time set to ${totalQuizTime} minutes`);
      } else {
        alert('Failed to set total quiz time');
      }
    } catch (error) {
      console.error('Error setting total quiz time:', error);
    }
  };

  const resetForm = () => {
    setQuestionText('');
    setOptions(['', '', '', '']);
    setCorrectAnswer('');
    setTimeLimit(30);
    setEditingQuestion(null);
  };

  const handleEditQuestion = (question) => {
    setEditingQuestion(question);
    setQuestionText(question.questionText);
    setOptions(question.options);
    setCorrectAnswer(question.correctAnswer);
    setTimeLimit(question.timeLimit);
  };

  useEffect(() => {
    fetchQuestions();
  }, [categoryId]);

  return (
    <div className="question-management">
      <h2>Manage Questions</h2>

      {/* Add or Edit Question */}
      <div className="add-question">
        <h3>{editingQuestion ? 'Edit Question' : 'Add Question'}</h3>
        <input
          type="text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Enter question text"
        />
        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            value={option}
            onChange={(e) => {
              const newOptions = [...options];
              newOptions[index] = e.target.value;
              setOptions(newOptions);
            }}
            placeholder={`Option ${index + 1}`}
          />
        ))}
        <input
          type="text"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          placeholder="Correct answer"
        />
        <input
          type="number"
          value={timeLimit}
          onChange={(e) => setTimeLimit(e.target.value)}
          placeholder="Time limit per question (seconds)"
        />
        <button onClick={handleAddOrUpdateQuestion}>
          {editingQuestion ? 'Update Question' : 'Add Question'}
        </button>
        {editingQuestion && <button onClick={resetForm}>Cancel</button>}
      </div>

      {/* Question List */}
      <div className="question-list">
        <table>
          <thead>
            <tr>
              <th>Question</th>
              <th>Options</th>
              <th>Correct Answer</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {questions.length > 0 ? (
              questions.map((q) => (
                <tr key={q._id}>
                  <td>{q.questionText}</td>
                  <td>
                    {q.options.map((opt, index) => (
                      <div key={index}>{opt}</div>
                    ))}
                  </td>
                  <td>{q.correctAnswer}</td>
                  <td>
                    <button onClick={() => handleEditQuestion(q)}>
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDeleteQuestion(q._id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No questions available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Set Quiz Time */}
      <div className="set-quiz-time">
        <h3>Set Total Quiz Time</h3>
        <input
          type="number"
          value={totalQuizTime}
          onChange={(e) => setTotalQuizTime(e.target.value)}
          placeholder="Total time for quiz (minutes)"
        />
        <button onClick={handleSetTotalQuizTime}>Set Quiz Time</button>
      </div>
    </div>
  );
};

export default QuestionManagement;
