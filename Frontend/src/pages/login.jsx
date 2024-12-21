import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/pagesStyle/login.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const loginData = { id: username, password }; // Renamed to match backend

    try {
      const response = await axios.post('http://localhost:4000/api/users/login', loginData);
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token); // Store the token here
        localStorage.setItem('id', username);
        setSuccessMessage('Login successful! Redirecting...');
        setTimeout(() => {
          navigate('/quizPage');
        }, 1000);
      } else {
        setErrorMessage('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      if (error.response) {
        setErrorMessage(`Error: ${error.response.status} - ${error.response.data.message}`);
      } else if (error.request) {
        setErrorMessage('Login failed. No response from server.');
      } else {
        setErrorMessage('Login failed. Error setting up the request.');
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">User ID</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <button type="submit" className="login-btn">Login</button>
          </form>
        </div>
        <div className="vertical-line"></div>
        <div className="description">
          <h2>About the Quiz App</h2>
          <p>
            The quiz app is simple and intuitive with its own set of rules.
          </p>
          <p>
            Enter your user ID and default password, click the login button, and navigate to the dashboard to start answering quiz questions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
