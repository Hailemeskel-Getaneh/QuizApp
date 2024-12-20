import React, { useState, useEffect } from 'react';
import '../styles/userManagement.css';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import AddUserModal from '../components/AddUserModal';
import EditUserModal from '../components/EditUserModal';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // Store the user being edited
  const [isAddingUser, setIsAddingUser] = useState(false); // Track whether we are adding a user

  // Fetch all users from the backend
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      console.log("Fetched users:", data);
      setUsers(data); // Save users to state
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users based on search input
  useEffect(() => {
    if (users.length > 0) {
      const result = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredUsers(result);
    }
  }, [search, users]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/users/delete-user/${id}`, { method: 'DELETE' });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error deleting user:', errorData.message || 'Unknown error');
        alert('Failed to delete user. Please try again.');
        return;
      }
  
      const data = await response.json(); // Handle the response data
      setUsers(users.filter(user => user._id !== id)); // Remove deleted user from the UI
      alert('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('An error occurred while deleting the user. Please try again later.');
    }
  };  

  // Handle user editing
  const handleEdit = (user) => {
    setSelectedUser(user); // Set the selected user to be edited
    setShowModal(true); // Show the modal
  };

  // Toggle add user modal visibility
  const handleAddUser = () => {
    setIsAddingUser(true); // Set the flag to show Add User Modal
    setShowModal(true); // Open the modal
  };

  return (
    <div className="user-management-container">
      <div className="header">
        <h2>User Management</h2>
        <button className="add-user-btn" onClick={handleAddUser}>
          + Add User
        </button>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)} // Update search state
        />
        <FaSearch />
      </div>

      {/* User Table */}
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handleEdit(user)} className="edit-btn">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(user._id)} className="delete-btn">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add User Modal */}
      {showModal && (
        <AddUserModal 
          setShowModal={setShowModal} 
          fetchUsers={fetchUsers} 
          isAddingUser={isAddingUser} // Pass the flag for Add User
          setIsAddingUser={setIsAddingUser} // Reset the flag after closing modal
        />
      )}
      

      {/* Edit User Modal */}
      {showModal && selectedUser && !isAddingUser && (
        <EditUserModal 
          user={selectedUser} 
          setShowModal={setShowModal} 
          fetchUsers={fetchUsers} 
        />
      )}
    </div>
  );
};

export default UserManagement;
