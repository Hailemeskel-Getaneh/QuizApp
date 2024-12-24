import React, { useState } from 'react';
import '../styles/pagesStyle/login.css';
import { Link, useNavigate } from 'react-router-dom';
// import axios from '../components/axios_instance.jsx';
import axios from 'axios';


const LoginPage = () => {
  const [loginData, setLoginData] = useState({ userId: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/users/login', loginData);
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token); // Store the JWT token
        alert('Login successful!');
        navigate('/quizPage'); // Redirect to /quizPage
      } else {
        alert('Login failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        alert(`Login failed: ${error.response.data.message}`);
      } else {
        alert('Login failed. Please try again later.');
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
                name="userId"
                value={loginData.userId}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                required
              />
            </div>
       
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
