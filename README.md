# 🚀 Task Manager

A full-stack **Task Manager web application** built with **Node.js, Express.js, MongoDB, and Vanilla JavaScript**.

The application provides secure user authentication and allows users to create, manage, search, filter, and organize their personal tasks.

---

## ✨ Features

### 🔐 Authentication

- User registration
- User login
- Password hashing using `bcryptjs`
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

### 🎨 User Interface

- Responsive design
- Mobile-friendly layout
- Dark mode
- Light mode
- Modern dashboard interface
- Login/Register interface
- Password reset interface

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Authentication** | JWT, bcryptjs |
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **API Testing** | Postman |
| **Version Control** | Git, GitHub |
| **Development** | VS Code |

---

## 🏗️ Project Architecture

```text
                    ┌─────────────────────┐
                    │      Frontend       │
                    │ HTML / CSS / JS     │
                    └──────────┬──────────┘
                               │
                         HTTP Requests
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Express / Node.js │
                    └──────────┬──────────┘
                               │
              ┌────────────────┴────────────────┐
              │                                 │
              ▼                                 ▼
     ┌──────────────────┐             ┌──────────────────┐
     │ Authentication   │             │    Task API      │
     │                  │             │                  │
     │ Register         │             │ Create           │
     │ Login            │             │ Read             │
     │ Forgot Password  │             │ Update           │
     │ Reset Password   │             │ Delete           │
     └──────────────────┘             └────────┬─────────┘
                                               │
                                               ▼
                                      ┌──────────────────┐
                                      │     MongoDB      │
                                      │                  │
                                      │ Users            │
                                      │ Tasks            │
                                      └──────────────────┘
```

---

## 📁 Project Structure

```text
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

```bash
git clone https://github.com/Janumaplly-Raghavendra/Task-Manager.git
```

### 2. Navigate to the project

```bash
cd Task-Manager
```

### 3. Install dependencies

```bash
npm install
```

---


---

## ▶️ Run the Application

Start the server:

```bash
node index.js
```

The application will run at:

```text
http://localhost:3000
```

Open the URL in your browser.

---

## 🔑 API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/register` | Register a new user |
| `POST` | `/auth/login` | Login user |
| `POST` | `/auth/forgot-password` | Request password reset |
| `POST` | `/auth/reset-password/:token` | Reset password |

### Tasks

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/tasks` | Get user's tasks |
| `POST` | `/tasks` | Create a task |
| `PUT` | `/tasks/:id` | Update a task |
| `DELETE` | `/tasks/:id` | Delete a task |

> 🔒 All task endpoints require JWT authentication.

---

## 🔐 Authentication Flow

```text
User
 │
 ├── Register
 │       │
 │       ▼
 │   Password hashed
 │       │
 │       ▼
 │   User stored in MongoDB
 │
 └── Login
         │
         ▼
    Verify credentials
         │
         ▼
      JWT Token
         │
         ▼
   Access protected APIs
```

---

## 🔄 Password Reset Flow

```text
Forgot Password
       │
       ▼
Enter Email
       │
       ▼
Generate Reset Token
       │
       ▼
Hash Token
       │
       ▼
Store Token + Expiry
       │
       ▼
Reset Password
       │
       ▼
Verify Token
       │
       ▼
Update Password
```

### Reset Token Security

- Reset token is randomly generated
- Token is hashed before database storage
- Token expires after **15 minutes**
- Token is removed after successful password reset

> Currently, the reset link is displayed in the server terminal for development/testing. Email delivery can be added later.

---

## 🔒 Security

- Passwords are hashed using `bcryptjs`
- JWT protects authenticated routes
- Users can only access their own tasks
- Password reset tokens are hashed before storage
- Password reset tokens expire after 15 minutes
- Request validation is implemented
- Invalid task IDs are handled
- `.env` is excluded using `.gitignore`
- Protected routes reject missing or invalid JWT tokens

---

## 🧪 Testing

API endpoints were tested using **Postman**.

### Tested Functionality

- [x] Registration validation
- [x] Duplicate user prevention
- [x] Login validation
- [x] Incorrect password handling
- [x] JWT authentication
- [x] Protected task routes
- [x] User-specific task access
- [x] Task creation
- [x] Task updates
- [x] Task deletion
- [x] Task search
- [x] Task filtering
- [x] Password reset flow

---

## 📊 Task Features

Each task can contain:

| Field | Description |
|---|---|
| `title` | Task title |
| `completed` | Completion status |
| `dueDate` | Optional task deadline |
| `priority` | `low`, `medium`, or `high` |
| `category` | `work`, `personal`, `study`, or `other` |
| `user` | Owner of the task |

---

## 🗄️ Database Models

### User

```text
User
├── name
├── email
├── password
├── resetPasswordToken
├── resetPasswordExpires
├── createdAt
└── updatedAt
```

### Task

```text
Task
├── title
├── completed
├── dueDate
├── priority
├── category
├── user
├── createdAt
└── updatedAt
```

---

## 🚀 Future Improvements

- Email-based password reset
- Automated unit and integration tests
- Task reminders and notifications
- Production deployment
- Improved task editing UI
- Pagination for large task lists
- Task sorting
- Better error handling
- API documentation with Swagger

---

## 🌐 Repository

GitHub:

[Task Manager Repository](https://github.com/Janumaplly-Raghavendra/Task-Manager)

---

## 👨‍💻 Author

**Raghavendra**

GitHub:

[Janumaplly-Raghavendra](https://github.com/Janumaplly-Raghavendra)

---

## ⭐ Project Highlights

This project demonstrates practical experience with:

- REST API development
- Node.js and Express.js
- MongoDB and Mongoose
- JWT authentication
- Password hashing
- Middleware
- CRUD operations
- API validation
- Frontend-backend integration
- Responsive UI development
- Git and GitHub
