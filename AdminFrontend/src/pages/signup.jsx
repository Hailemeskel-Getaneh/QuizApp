import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Use navigate hook from react-router-dom
import axios from 'axios'; // Import axios to send HTTP requests
import '../styles/signup.css';

const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate(); // To navigate after success
  
    // Function to handle form submission
    async function handleSignup(e) {
        e.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setTimeout(() => setError(""), 4000); // Clear error message after 4 seconds
            return;
        }

        try {
            const response = await axios.post("http://localhost:4000/api/register", {
                email,
                password
            });
            console.log(response.data);
            setSuccessMessage("Registration successful! Redirecting...");
            setTimeout(() => {
                navigate("/logging"); // Redirect to Login page
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
            setTimeout(() => setError(""), 4000); // Clear error message after 4 seconds
        }
    }
      
    return (
        <div className="form-container">
            <div className="form">
                <h2>Signup</h2>
                <form onSubmit={handleSignup}>
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
                    {error && <p className="error-message">{error}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}
                    <button type="submit" className="form-btn">Signup</button>
                </form>
                <div className="redirect-link">
                    <p>Already have an account? <Link to="/logging">Login here</Link></p>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
