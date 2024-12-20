import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import questionRoutes from './routes/questionRoutes.js';
import quizRoutes from './routes/quizRoutes.js';

const app = express();

dotenv.config();


// Middleware setup
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000; 
const MONGO_URL = process.env.MONGODB_URI;

if (!MONGO_URL) {
  console.error('Error: MONGODB_URI is not set in environment variables');
  process.exit(1); // Exit the application if no MongoDB URI is provided
}

mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.error('Database connection error:', err.message);
    process.exit(1); // Exit the application if the database connection fails
  });



// Mock data for dashboard
const dashboardStats = {
    users: 120,
    quizzes: 45,
    attempts: 320,
    passRate: 85,
  };
  
  // Mock data for user growth
  const userGrowthData = {
    dates: ['Jan', 'Feb', 'Mar'],
    users: [120, 130, 150],
  };
  
  // Mock data for quiz performance
  const quizPerformanceData = {
    quizzes: ['Quiz 1', 'Quiz 2', 'Quiz 3'],
    scores: [75, 85, 95],
  };
  
  app.get('/api/dashboard-stats', (req, res) => {
    res.json(dashboardStats);
  });
  
  app.get('/api/user-growth', (req, res) => {
    res.json(userGrowthData);
  });
  
  app.get('/api/quiz-performance', (req, res) => {
    res.json(quizPerformanceData);
  });
// Routes
app.use('/api', userRoutes); // Prefix user-related routes with `/api/users`
app.use('/api', categoryRoutes);
app.use('/api', questionRoutes);
app.use('/api', quizRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

