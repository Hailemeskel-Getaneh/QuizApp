import express from 'express';
import Category from '../models/categoryModel.js';

const router = express.Router();

// Create Category
router.post('/add-category', async (req, res) => {
  const { name, description } = req.body;
  const newCategory = new Category({ name, description });

  try {
    await newCategory.save();
    // console.log(`Category created: ${newCategory._id}`);
    res.status(201).json({ message: 'Category created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating category', error });
  }
});

// Get All Categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Error fetching categories', error });
  }
});

// Delete Category by ID
router.delete('/delete-category/:categoryId', async (req, res) => {
  const { categoryId } = req.params;

  try {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      console.warn(`Category not found: ${categoryId}`);
      return res.status(404).json({ message: 'Category not found' });
    }

    console.log(`Category deleted: ${categoryId}`);
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    // console.error(`Error deleting category (${categoryId}):`, error);
    res.status(500).json({ message: 'Error deleting category', error });
  }
});

// Update Category by using ID
router.put('/update-category/:categoryId', async (req, res) => {
  const { categoryId } = req.params;
  const { name, description } = req.body;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name, description },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      console.warn(`Category not found: ${categoryId}`);
      return res.status(404).json({ message: 'Category not found' });
    }

    // console.log(`Category updated: ${categoryId}`);
    res.status(200).json({ message: 'Category updated successfully', updatedCategory });
  } catch (error) {
    console.error(`Error updating category (${categoryId}):`, error);
    res.status(500).json({ message: 'Error updating category', error });
  }
});


export default router;
