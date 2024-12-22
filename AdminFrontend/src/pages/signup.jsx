import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Use navigate hook from react-router-dom
import axios from 'axios'; // Import axios to send HTTP requests
import '../styles/signup.css';

const CreateAccountPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate(); // To navigate after success
  
    // Function to handle form submission
    async function buttonHandler(e) {
        e.preventDefault();
      
        // Check if passwords match
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          setTimeout(() => setError(""), 4000);
          return;
        }
      
        try {
          const response = await axios.post("http://localhost:4000/api/user/register", {
            email,
            password,
          });
      
          // Check if response is defined and has the expected data
          if (response && response.data) {
            console.log(response.data); // Log the response to see the data
            setSuccessMessage("Registration successful! Redirecting...");
            setTimeout(() => {
              navigate("/dashboard");
            }, 2000);
          } else {
            setError("Unexpected response format");
          }
        } catch (err) {
          console.error(err);
          // Check if error.response exists and handle accordingly
          if (err.response && err.response.data) {
            setError(err.response.data.message);
          } else {
            setError("An error occurred. Please try again later.");
          }
          setTimeout(() => setError(""), 4000);
        }
      }
      
    return (
        <div className="create-account-container">
            <div className="create-account-form">
                <h2>Create Account</h2>
                <form onSubmit={buttonHandler}> {/* Use buttonHandler instead of handleSubmit */}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>} {/* Fix error message */}
                    {successMessage && <p className="success-message">{successMessage}</p>}
                    <button type="submit" className="create-account-btn">Create Account</button>
                </form>
                <div className="login-link">
                    <p>Already have an account? <Link to="/login">Login here</Link></p>
                </div>
            </div>
        </div>
    );
};

export default CreateAccountPage;
