import React, { useState } from 'react';
import '../styles/adminLogin.css';

const LoginPage = () => {
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
  
    try {
      const response = await fetch('http://localhost:4000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: username,
          password,
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }
  
      const data = await response.json();
      setSuccessMessage('Login successful! Redirecting...');
      localStorage.setItem('token', data.token);
      localStorage.setItem('id', username);
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1000);
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred. Please try again.');
      console.error('Error during login:', error);
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
