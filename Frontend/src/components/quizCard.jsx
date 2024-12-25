import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/pagesStyle/quizCard.css';
import QuizTimer from '../components/QuizTimer.jsx'; // Importing the timer component
import axios from 'axios'; // Assuming you're using axios for API calls

const QuizCard = () => {
  const { state } = useLocation();
  const { questions, quizName, quizId } = state || {}; // Include quizId from state
  const [currentPage, setCurrentPage] = useState(0); // Track current page index
  const [answers, setAnswers] = useState({}); // Track user answers
  const [quizCompleted, setQuizCompleted] = useState(false); 
  const [totalTime, setTotalTime] = useState(60); // Track quiz duration from the database

  const QUESTIONS_PER_PAGE = 2; // Number of questions per page

  // Fetch totalTime from the database
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get(`/api/quizzes/${quizId}`); // Replace with your API endpoint
        setTotalTime(response.data.totalTime * 60); // Convert minutes to seconds
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    if (quizId) {
      fetchQuizData();
    }
  }, [quizId]);

  const handleOptionChange = (questionIndex, optionValue) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: optionValue,
    }));
  };

  const handleNext = () => {
    if ((currentPage + 1) * QUESTIONS_PER_PAGE < questions.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score += 1; // Increment score for each correct answer
      }
    });
    return score;
  };

  const getUserId = () => {
    const token = localStorage.getItem('authToken');
    console.log('Token in localStorage:', token);  // Log token to verify it exists
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));  // Decode the payload of the token
        console.log('Decoded token:', decodedToken);  // Check decoded token
        return decodedToken.userId;  // Return userId if present
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    } else {
      console.log('User is not logged in, token not found');
      return null;  // Return null if no token found
    }
  };
  
  
  

  // Handle quiz submission
  const handleSubmit = async () => {
    setQuizCompleted(true);
    const score = calculateScore(); // Calculate the score when the quiz is submitted
    console.log('User answers:', answers);
    console.log('Calculated score:', score);

    // Get the logged-in user's ID
    const userId = getUserId();
    if (!userId) {
      alert('User not logged in!');
      return;
    }

    // Send answers and score to the backend
    try {
      await axios.post(`/api/quizzes/${quizId}/submit`, {
        userId,
        answers,
        score,
        quizId,
      });
      alert('Quiz submitted successfully!');
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  // Get questions for the current page
  const currentQuestions = questions?.slice(
    currentPage * QUESTIONS_PER_PAGE,
    (currentPage + 1) * QUESTIONS_PER_PAGE
  );

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2>{quizName}</h2>
        {totalTime && (
          <QuizTimer duration={totalTime} onTimeUp={handleSubmit} />
        )}
      </div>

      {quizCompleted ? (
        <div className="quiz-completed-message">
          <h3>Thank you for completing the quiz!</h3>
          <p>
            You answered {Object.keys(answers).length} out of {questions.length}{' '}
            questions.
          </p>
        </div>
      ) : (
        <>
          {currentQuestions && currentQuestions.length > 0 ? (
            <div className="quiz-question-card">
              {currentQuestions.map((question, index) => {
                const questionIndex =
                  currentPage * QUESTIONS_PER_PAGE + index;
                return (
                  <div key={questionIndex} className="quiz-question">
                    <p className="quiz-question-text">
                      <strong>Question {questionIndex + 1}:</strong>{' '}
                      {question.questionText}
                    </p>
                    <div className="quiz-options">
                      {question.options.map((option, optionIndex) => (
                        <label
                          key={optionIndex}
                          className={`quiz-option ${
                            answers[questionIndex] === option ? 'selected' : ''
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${questionIndex}`}
                            value={option}
                            checked={answers[questionIndex] === option}
                            onChange={() =>
                              handleOptionChange(questionIndex, option)
                            }
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}
              {/* Navigation buttons */}
              <div className="quiz-navigation">
                <button
                  className="quiz-button"
                  onClick={handlePrevious}
                  disabled={currentPage === 0}
                >
                  Previous
                </button>
                {(currentPage + 1) * QUESTIONS_PER_PAGE < questions.length ? (
                  <button className="quiz-button" onClick={handleNext}>
                    Next
                  </button>
                ) : (
                  <button className="quiz-button" onClick={handleSubmit}>
                    Submit
                  </button>
                )}
              </div>
            </div>
          ) : (
            <p className="no-questions">No questions available.</p>
          )}
        </>
      )}
    </div>
  );
};

export default QuizCard;





// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import '../styles/pagesStyle/quizCard.css';
// import QuizTimer from '../components/QuizTimer.jsx'; // Importing the timer component
// import axios from 'axios'; // Assuming you're using axios for API calls

// const QuizCard = () => {
//   const { state } = useLocation();
//   const { questions, quizName, quizId } = state || {}; // Include quizId from state
//   const [currentPage, setCurrentPage] = useState(0); // Track current page index
//   const [answers, setAnswers] = useState({}); // Track user answers
//   const [quizCompleted, setQuizCompleted] = useState(false); // Track quiz completion
//   const [totalTime, setTotalTime] = useState(30); // Track quiz duration from the database

//   const QUESTIONS_PER_PAGE = 2; // Number of questions per page

//   // Fetch totalTime from the database
//   useEffect(() => {
//     const fetchQuizData = async () => {
//       try {
//         const response = await axios.get(`/api/quizzes/${quizId}`); // Replace with your API endpoint
//         setTotalTime(response.data.totalTime * 60); // Convert minutes to seconds
//       } catch (error) {
//         console.error('Error fetching quiz data:', error);
//       }
//     };

//     if (quizId) {
//       fetchQuizData();
//     }
//   }, [quizId]);

//   const handleOptionChange = (questionIndex, optionValue) => {
//     setAnswers((prevAnswers) => ({
//       ...prevAnswers,
//       [questionIndex]: optionValue,
//     }));
//   };

//   const handleNext = () => {
//     if ((currentPage + 1) * QUESTIONS_PER_PAGE < questions.length) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentPage > 0) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleSubmit = () => {
//     setQuizCompleted(true);
//     console.log('User answers:', answers);
//   };

//   // Get questions for the current page
//   const currentQuestions = questions?.slice(
//     currentPage * QUESTIONS_PER_PAGE,
//     (currentPage + 1) * QUESTIONS_PER_PAGE
//   );

//   return (
//     <div className="quiz-container">
//       <div className="quiz-header">
//         <h2>{quizName}</h2>
//         {totalTime && (
//           <QuizTimer duration={totalTime} onTimeUp={handleSubmit} />
//         )} {/* Render timer only when totalTime is available */}
//       </div>

//       {quizCompleted ? (
//         <div className="quiz-completed-message">
//           <h3>Thank you for completing the quiz!</h3>
//           <p>
//             You answered {Object.keys(answers).length} out of {questions.length}{' '}
//             questions.
//           </p>
//         </div>
//       ) : (
//         <>
//           {currentQuestions && currentQuestions.length > 0 ? (
//             <div className="quiz-question-card">
//               {currentQuestions.map((question, index) => {
//                 const questionIndex =
//                   currentPage * QUESTIONS_PER_PAGE + index;
//                 return (
//                   <div key={questionIndex} className="quiz-question">
//                     <p className="quiz-question-text">
//                       <strong>Question {questionIndex + 1}:</strong>{' '}
//                       {question.questionText}
//                     </p>
//                     <div className="quiz-options">
//                       {question.options.map((option, optionIndex) => (
//                         <label
//                           key={optionIndex}
//                           className={`quiz-option ${
//                             answers[questionIndex] === option ? 'selected' : ''
//                           }`}
//                         >
//                           <input
//                             type="radio"
//                             name={`question-${questionIndex}`}
//                             value={option}
//                             checked={answers[questionIndex] === option}
//                             onChange={() =>
//                               handleOptionChange(questionIndex, option)
//                             }
//                           />
//                           {option}
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                 );
//               })}
//               {/* Navigation buttons */}
//               <div className="quiz-navigation">
//                 <button
//                   className="quiz-button"
//                   onClick={handlePrevious}
//                   disabled={currentPage === 0}
//                 >
//                   Previous
//                 </button>
//                 {(currentPage + 1) * QUESTIONS_PER_PAGE < questions.length ? (
//                   <button className="quiz-button" onClick={handleNext}>
//                     Next
//                   </button>
//                 ) : (
//                   <button className="quiz-button" onClick={handleSubmit}>
//                     Submit
//                   </button>
//                 )}
//               </div>
//             </div>
//           ) : (
//             <p className="no-questions">No questions available.</p>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default QuizCard;
