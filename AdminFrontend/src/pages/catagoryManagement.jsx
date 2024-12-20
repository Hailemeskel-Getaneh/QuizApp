// CategoryManagement.jsx
import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');

  // Fetch categories from the backend
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddCategory = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/add-category', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: categoryName, description: categoryDescription })
      });

      if (response.ok) {
        fetchCategories();
        setCategoryName('');
        setCategoryDescription('');
        alert('Category added successfully');
      } else {
        alert('Failed to add category');
      }
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Error adding category');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <h2>Manage Categories</h2>
      <input
        type="text"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        placeholder="Category Name"
      />
      <input
        type="text"
        value={categoryDescription}
        onChange={(e) => setCategoryDescription(e.target.value)}
        placeholder="Category Description"
      />
      <button onClick={handleAddCategory}>Add Category</button>

      <div>
        <h3>Categories List</h3>
        {categories.map((category) => (
          <div key={category._id}>
            <span>{category.name} - {category.description}</span>
            <button onClick={() => handleDeleteCategory(category._id)}>
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManagement;
