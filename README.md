# Quiz Management System

An advanced MERN stack application for creating, managing, and taking quizzes. This system includes both admin and user interfaces, supporting a wide range of quiz functionalities such as question categorization, time limits, and result tracking.

## Features

- **Admin Interface:**
  - Create, update, and delete quizzes.
  - Manage questions with categories.
  - Set time limits for quizzes.
  - Assign and distribute quizzes to users.

- **User Interface:**
  - Take assigned quizzes.
  - View quiz results.

- **Additional Features:**
  - Secure authentication and role-based access control.
  - Responsive and user-friendly design.

## Technologies Used

### Frontend
- React
- Material-UI
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Others
- JWT (JSON Web Tokens) for authentication
- Bcrypt for password hashing
- React Router for navigation

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Hailemeskel-Getaneh/quiz-management-system.git
   ```

2. Navigate to the project directory:
   ```bash
   cd quiz-management-system
   ```

3. Install dependencies for both frontend and backend:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the `backend` directory.
   - Add the following variables:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     PORT=4000
     ```

5. Start the development servers:
   ```bash
   npm run dev
   ```
   This will concurrently start both the frontend and backend servers.

6. Access the application:
   - Admin Interface: `http://localhost:3000/admin`
   - User Interface: `http://localhost:3000/user`

## Folder Structure

```plaintext
quiz-management-system
├── frontend      # React application (user/admin interface)
├── backend       # Node.js server and database logic
└── README.md     # Documentation
```

## Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Describe your changes"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## Authors

- **Hailemeskel Getaneh**  
  - GitHub: [Hailemeskel-Getaneh](https://github.com/Hailemeskel-Getaneh)  
  - Email: hailegetaneh1221@gmail.com

- **Mieraf Abebe**

- **Lidia Shenkut**

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Enjoy managing quizzes with ease!

