import React, { useState } from 'react';
import '../styles/pagesStyle/contact.css';
// import axios from 'axios';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const { name, email, message } = formData;
    const newErrors = {};

    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!message) newErrors.message = 'Message is required';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:5000/api/contact/submit', formData); // Corrected URL
        
        if (response.status === 200) {
          setSuccessMessage('Your message has been sent successfully!');
          setFormData({
            name: '',
            email: '',
            message: ''
          });
        } else {
          setSuccessMessage('Failed to send your message.');
        }
      } catch (error) {
        setSuccessMessage('An error occurred while sending your message.');
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="contact-container">
      <h2 id="ccc">Contact Us</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          {errors.message && <p className="error">{errors.message}</p>}
        </div>
        <button type="submit" className="submit-button">Send Message</button>
        {successMessage && <p className="success">{successMessage}</p>}
      </form>
      
    </div>
    
  );
};

export default ContactPage;
