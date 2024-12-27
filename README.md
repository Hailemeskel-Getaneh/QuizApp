
# Quiz Management System

**QuizAppWithTimer** is an advanced MERN stack application designed for creating, managing, and taking quizzes. This system includes separate admin and user interfaces, offering a comprehensive experience for both creating quizzes and taking them. Features include quiz categorization, customizable time limits, and result tracking.

### Team Name: ByteBuilders

- **Team Members:**
  - **Hailemeskel Getaneh** (GitHub: [Hailemeskel-Getaneh](https://github.com/Hailemeskel-Getaneh), Email: [hailegetaneh@gmail.com](mailto:hailegetaneh@gmail.com))
  - **Mieraf Abebe** (GitHub: [MierafA12](https://github.com/MierafA12), Email: [mierafabebe12@gmail.com](mailto:mierafabebe12@gmail.com))
  - **Lidia Shenkut** (GitHub: [lidia-shenkut](https://github.com/lidia-shenkut), Email: [liduruuha@gmail.com](mailto:liduruuha@gmail.com))

---

## Features

### Admin Interface:
- **Quiz Management:** Create, update, and delete quizzes.
- **Question Management:** Manage quiz questions with categories.
- **Time Limit Settings:** Set time limits for each quiz.
- **Quiz Distribution:** Assign and distribute quizzes to users.
- **Analytics:** View and track user progress and results.

### User Interface:
- **Assigned Quizzes:** Take quizzes assigned by the admin.
- **Quiz Result Tracking:** View and track quiz results and performance.
- **Timer:** Track remaining time while taking quizzes.

### Authentication & Security:
- **Role-based Authentication:** Admin and user roles with secure login and access control.
- **JWT (JSON Web Tokens):** For authentication and token-based authorization.
- **Password Security:** Passwords are securely hashed with **Bcrypt**.

### User Experience:
- **Responsive Design:** Works across multiple devices.
- **Real-time Timer:** Countdown timer integrated with quizzes.

---

## Technologies Used

### Frontend:
- **React.js** - For building user interfaces.
- **Material-UI** - For designing the UI with modern components.
- **Axios** - For making HTTP requests to the backend.
- **React Router** - For navigation and routing.

### Backend:
- **Node.js** - JavaScript runtime for building the backend.
- **Express.js** - Web framework for building RESTful APIs.
- **MongoDB** - NoSQL database for storing quizzes and user data.
- **Mongoose** - ODM for interacting with MongoDB.

### Security & Utilities:
- **JWT (JSON Web Tokens)** - For authentication and token-based authorization.
- **Bcrypt.js** - For hashing passwords securely.

---

## Installation

Follow these steps to get the application up and running locally:

### 1. Clone the Repository:
```bash
git clone https://github.com/Hailemeskel-Getaneh/quiz-app-with-timer.git
```

### 2. Navigate to the Project Directory:
```bash
cd quiz-app-with-timer
```

### 3. Install Dependencies for Frontend and Backend:
- For the frontend:
```bash
cd frontend
npm install
```
- For the backend:
```bash
cd ../backend
npm install
```

### 4. Set Up Environment Variables:
- Create a `.env` file inside the `backend` directory.
- Add the following variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=4000
```

### 5. Start Development Servers:
- To run both the backend and frontend concurrently:
```bash
npm run dev
```

This will start both the frontend (React) and backend (Node.js/Express) servers. The frontend will be accessible at `http://localhost:3000`.

### 6. Access the Application:
- **Admin Interface:** `http://localhost:3000/admin`
- **User Interface:** `http://localhost:3000/user`

---

## Folder Structure

```plaintext
quiz-app-with-timer
├── backend             # Backend (Node.js, Express, MongoDB)
│   ├── controllers     # Logic to handle requests
│   ├── models          # Database models (Mongoose)
│   ├── routes          # API routes for handling requests
│   ├── utils           # Utility functions and middleware
│   ├── .env            # Environment variables (hidden from public)
│   ├── server.js       # Main entry point for the server
│
├── frontend            # Frontend (React.js)
│   ├── components      # Reusable UI components (e.g., buttons, form fields)
│   ├── pages           # Pages for Admin, User, etc.
│   ├── services        # API calls using Axios
│   ├── App.js          # Main app component
│   ├── index.js        # Entry point for the React app
│   ├── package.json    # Frontend dependencies and configurations
│
└── README.md           # Project documentation
```

---

## Contributing

We welcome contributions to improve and extend the project. Please follow these steps to contribute:

1. **Fork** the repository.
2. **Clone** your fork:
   ```bash
   git clone https://github.com/your-username/quiz-app-with-timer.git
   ```
3. **Create a new branch** for your feature:
   ```bash
   git checkout -b feature-branch
   ```
4. **Make your changes** and commit them:
   ```bash
   git commit -m "Add new feature"
   ```
5. **Push** to your fork:
   ```bash
   git push origin feature-branch
   ```
6. **Open a pull request** with a detailed description of the changes.

---

## Authors

- **Hailemeskel Getaneh**  
  - GitHub: [Hailemeskel-Getaneh](https://github.com/Hailemeskel-Getaneh)  
  - Email: [hailegetaneh@gmail.com](mailto:hailegetaneh@gmail.com)

- **Mieraf Abebe**  
  - GitHub: [MierafA12](https://github.com/MierafA12)  
  - Email: [mierafabebe12@gmail.com](mailto:mierafabebe12@gmail.com)

- **Lidia Shenkut**  
  - GitHub: [lidia-shenkut](https://github.com/lidia-shenkut)  
  - Email: [liduruuha@gmail.com](mailto:liduruuha@gmail.com)

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

## Acknowledgments

- **MERN Stack**: MongoDB, Express.js, React.js, Node.js
- **Material-UI**: For creating a beautiful and responsive UI
- **JWT & Bcrypt**: For secure authentication and password hashing
- **GitHub**: For version control and collaboration

---

Enjoy building and managing quizzes with the **Quiz Management System**!
```

----------------------------------------------
