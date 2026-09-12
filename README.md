# Task Manager

A full-stack Task Manager application built with Node.js, Express.js, MongoDB and vanilla JavaScript.

Users can securely register, log in, and manage their personal tasks.

## 🚀 Features

### Authentication
- User registration
- User login
- Password hashing with bcrypt
- JWT-based authentication
- Protected API routes
- Logout
- User-specific tasks

### Task Management
- Create tasks
- View tasks
- Update tasks
- Mark tasks as completed
- Edit task titles
- Delete tasks
- Search tasks
- Filter completed/pending tasks

### UI
- Responsive design
- Mobile-friendly layout
- Task statistics
- Loading state
- Empty state
- Notifications
- Login/Register interface

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

### Frontend
- HTML5
- CSS3
- JavaScript

### Tools
- Git
- GitHub
- VS Code
- Postman

## 📁 Project Structure

```text
task-manager/
│
├── controllers/
│   ├── authController.js
│   └── taskController.js
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   ├── User.js
│   └── Task.js
│
├── routes/
│   ├── authRoutes.js
│   └── taskRoutes.js
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── .env
├── .gitignore
├── index.js
├── package.json
└── README.md

⚙️ Installation

Clone the repository:



git clone YOUR_GITHUB_REPOSITORY_URL

Go into the project:



cd task-manager

Install dependencies:



npm install

🔐 Environment Variables

Create a .env file in the project root:



MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Do not commit .env to GitHub.

▶️ Run the Application

Start the server:



node index.js

Open:



http://localhost:3000

🔑 API Endpoints

Authentication

MethodEndpointDescription





POST

/auth/register

Register a user

POST

/auth/login

Login user

Tasks

MethodEndpointDescription





GET

/tasks

Get user's tasks

POST

/tasks

Create a task

PUT

/tasks/:id

Update a task

DELETE

/tasks/:id

Delete a task

All task endpoints require JWT authentication.

🔒 Security

Passwords are hashed using bcrypt

JWT authentication protects task routes

Users can only access their own tasks

Request validation is implemented

Invalid task IDs are handled

.env is excluded from Git

📌 Future Improvements

Password reset

Task due dates

Task priorities

Task categories

Dark mode

Deployment

Automated testing

👨‍💻 Author

Raghavendra

⭐ If you find this project useful, consider giving it a star!




### 3. Check `.gitignore`

Make sure it contains:

```text
node_modules/
.env
