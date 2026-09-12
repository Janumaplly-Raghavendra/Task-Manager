const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

console.log("JWT_SECRET loaded:", !!process.env.JWT_SECRET);

const app = express();


const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, "frontend")));


// Custom middleware
app.use((req, res, next) => {
    console.log("Request received:", req.method, req.url);
    next();
});

// Import routes
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

// Task routes
app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes);

// Home route
app.get("/", (req, res) => {
    res.sendFile(
        path.join(__dirname, "frontend", "index.html")
    );
});

// About route
app.get("/about", (req, res) => {
    res.json({
        project: "Task Manager",
        developer: "Robert"
    });
});

// 404 - Route not found
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        message: "Something went wrong"
    });
});

// Connect to MongoDB first
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        // Start server only after MongoDB connection
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    });

