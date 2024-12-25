import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Use navigate hook from react-router-dom
import axios from 'axios'; // Import axios to send HTTP requests
import '../styles/adminLogin.css';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate(); // To navigate after success
  
    // Function to handle form submission
    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:4000/api/login", {
                email,
                password
            });
            console.log(response.data);
            setSuccessMessage("Login successful! Redirecting...");
            setTimeout(() => {
                navigate("/dashboard"); // Redirect to Dashboard page
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Invalid credentials");
            setTimeout(() => setError(""), 4000); // Clear error message after 4 seconds
        }
    }
      
    return (
        <div className="form-container">
            <div className="form">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
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
                    {error && <p className="error-message">{error}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}
                    <button type="submit" className="form-btn">Login</button>
                </form>
                <div className="redirect-link">
                    <p>Don't have an account? <Link to="/signup">Signup here</Link></p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
