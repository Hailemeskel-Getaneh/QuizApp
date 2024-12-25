import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import questionRoutes from './routes/questionRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import loginRoute from './routes/loginRoute.js';
import sinupRoute from './routes/sinupRoute.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import quizResultRoutes from './routes/quizResultRoutes.js'

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
  .connect(MONGO_URL)
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.error('Database connection error:', err.message);
    process.exit(1); // Exit the application if the database connection fails
  });

// Routes
app.use('/api', userRoutes); // Prefix user-related routes with `/api/users`
app.use('/api', categoryRoutes);
app.use('/api', questionRoutes);
app.use('/api', quizRoutes);
app.use('/api/user', sinupRoute);
app.use('/api', dashboardRoutes)
app.use('/api', quizResultRoutes)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});


