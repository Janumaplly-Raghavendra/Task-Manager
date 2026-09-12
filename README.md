# 🚀 Task Manager

A full-stack Task Manager web application built with **Node.js, Express.js, MongoDB, and Vanilla JavaScript**.

The application provides secure user authentication and allows users to create, manage, search, filter, and organize their personal tasks.

---

## ✨ Features

### 🔐 Authentication

- User registration
- User login
- Password hashing using bcrypt
- JWT-based authentication
- Protected task routes
- User-specific tasks
- Logout
- Forgot password
- Password reset with expiring reset token

### 📋 Task Management

- Create tasks
- View tasks
- Update tasks
- Delete tasks
- Mark tasks as completed
- Undo completed tasks
- Edit task details
- Task due dates
- Task priorities
- Task categories
- Search tasks
- Filter completed/pending tasks

### 📊 Dashboard

- Total task count
- Completed task count
- Pending task count
- Category statistics
- Priority statistics
- Loading state
- Empty state
- Notifications

### 🎨 UI

- Responsive design
- Mobile-friendly layout
- Dark mode
- Light mode
- Modern dashboard interface
- Login/Register interface

---

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

---

## 🏗️ Project Architecture

```text
Frontend
   │
   │ HTTP Requests
   ▼
Express.js / Node.js
   │
   ├── Authentication
   │      ├── Register
   │      ├── Login
   │      └── Password Reset
   │
   ├── Task API
   │      ├── Create
   │      ├── Read
   │      ├── Update
   │      └── Delete
   │


## 📁 Project Structure

```
```

```
Task-Manager/
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
│   ├── reset-password.html
│   ├── style.css
│   └── script.js
│
├── .gitignore
├── index.js
├── package.json
├── package-lock.json
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```
```

```
git clone https://github.com/Janumaplly-Raghavendra/Task-Manager.git
```

### 2. Navigate to the project

```
```

```
cd Task-Manager
```

### 3. Install dependencies

```
```

```
npm install
```

---

---

## ▶️ Run the Application

Start the server:

```
```

```
node index.js
```

Open the application:

```
```

```
http://localhost:3000
```

---

## 🔑 API Endpoints

### Authentication

| MethodEndpointDescription |                               |                        |
| ------------------------- | ----------------------------- | ---------------------- |
| POST                      | `/auth/register`              | Register a new user    |
| POST                      | `/auth/login`                 | Login user             |
| POST                      | `/auth/forgot-password`       | Request password reset |
| POST                      | `/auth/reset-password/:token` | Reset password         |

### Tasks

| MethodEndpointDescription |              |                  |
| ------------------------- | ------------ | ---------------- |
| GET                       | `/tasks`     | Get user's tasks |
| POST                      | `/tasks`     | Create a task    |
| PUT                       | `/tasks/:id` | Update a task    |
| DELETE                    | `/tasks/:id` | Delete a task    |

All task endpoints require JWT authentication.

---

## 🔒 Security

-  Passwords are hashed using bcrypt 
-  JWT protects authenticated routes 
-  Users can only access their own tasks 
-  Password reset tokens are hashed before storage 
-  Password reset tokens expire after 15 minutes 
-  Request validation is implemented 
-  Invalid task IDs are handled 
- `.env` is excluded using `.gitignore` 

---

## 🧪 Testing

API endpoints were tested using **Postman**.

Tested functionality includes:

-  Registration validation 
-  Duplicate user prevention 
-  Login validation 
-  Incorrect password handling 
-  JWT authentication 
-  Protected task routes 
-  User-specific task access 
-  Task creation 
-  Task updates 
-  Task deletion 
-  Search and filtering 
-  Password reset flow 

---

## 🚀 Future Improvements

-  Email-based password reset 
-  Automated unit and integration tests 
-  Task reminders and notifications 
-  Production deployment 
-  Improved task editing UI 
-  Pagination for large task lists 

---

## 👨‍💻 Author

**Raghavendra**

GitHub:

https://github.com/Janumaplly-Raghavendra
   ▼
MongoDB
