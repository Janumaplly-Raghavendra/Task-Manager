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
   ▼
MongoDB
