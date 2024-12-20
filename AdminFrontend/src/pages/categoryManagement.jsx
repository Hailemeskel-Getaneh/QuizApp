import React, { useState, useEffect } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import '../styles/categoryManagement.css';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);

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
        body: JSON.stringify({ name: categoryName, description: categoryDescription }),
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

  const handleDeleteCategory = async (categoryId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/delete-category/${categoryId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchCategories();
        alert('Category deleted successfully');
      } else {
        alert('Failed to delete category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Error deleting category');
    }
  };

  const handleEditCategory = (category) => {
    setEditMode(true);
    setEditCategoryId(category._id);
    setCategoryName(category.name);
    setCategoryDescription(category.description);
  };

  const handleUpdateCategory = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/update-category/${editCategoryId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: categoryName, description: categoryDescription }),
      });

      if (response.ok) {
        fetchCategories();
        setEditMode(false);
        setEditCategoryId(null);
        setCategoryName('');
        setCategoryDescription('');
        alert('Category updated successfully');
      } else {
        alert('Failed to update category');
      }
    } catch (error) {
      console.error('Error updating category:', error);
      alert('Error updating category');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div id="category-management-container">
      <h2>Manage Categories</h2>
      <input
        className="input-field"
        type="text"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        placeholder="Category Name"
      />
      <input
        className="input-field"
        type="text"
        value={categoryDescription}
        onChange={(e) => setCategoryDescription(e.target.value)}
        placeholder="Category Description"
      />
      <div className="buttons">
      {editMode ? (
        <button className="update-category-btn" onClick={handleUpdateCategory}>Update Category</button>
      ) : (
        <button className="add-category-btn" onClick={handleAddCategory}>Add Category</button>
      )}
      </div>
  

      <div>
        <h3>Categories List</h3>
        {categories.map((category) => (
          <div key={category._id} className="category-item">
            <span>{category.name} - {category.description}</span>

            <div className="buttons">
            <button onClick={() => handleEditCategory(category)}>
              <FaEdit />
            </button>
            <button onClick={() => handleDeleteCategory(category._id)}>
              <FaTrash />
            </button>
            </div>

            
         
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManagement;
