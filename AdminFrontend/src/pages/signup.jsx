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
        setError("Passwords do not match"); // Set error message if passwords don't match
        setTimeout(() => setError(""), 4000); // Clear error message after 4 seconds
        return; // Exit function if passwords don't match
      }
  
      try {
        const response = await axios.post("http://localhost:4000/api/register", {
          email,
          password
        });
        console.log(response.data);
        setSuccessMessage("Registration successful! Redirecting...");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000); // Navigate to Login page after 2 seconds
      } catch (err) {
        setError(err.response.data.message);
        setTimeout(() => setError(""), 4000); // Clear error message after 4 seconds
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
                    <p>Already have an account? <Link to="/">Login here</Link></p>
                </div>
            </div>
        </div>
    );
};

export default CreateAccountPage;
