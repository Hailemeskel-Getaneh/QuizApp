import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import '../styles/modal.css'; // Ensure to style this modal in a separate file

const AddUserModal = ({ setShowModal, fetchUsers }) => {
  const [userData, setUserData] = useState({
    userId: '', // Added userId field
    name: '',
    email: '',
    role: 'user',
    score: 0 // Default score
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Submitting user data:', userData); // Log the form data

    try {
      const response = await axios.post('http://localhost:4000/api/add-user', userData);

      console.log('User added successfully:', response.data);

      fetchUsers(); // Refresh the user list
      setShowModal(false); // Close modal after submitting
    } catch (error) {
      console.error('Error during user submission:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Add New User</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="userId">User ID</label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={userData.userId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={userData.role}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="score">Score</label>
            <input
              type="number"
              id="score"
              name="score"
              value={userData.score}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Add User</button>
        </form>
        <button className="close-btn" onClick={() => setShowModal(false)}>Close</button>
      </div>
    </div>
  );
};

export default AddUserModal;
