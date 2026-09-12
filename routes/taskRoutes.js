const express = require("express");

const router = express.Router();

const {
    getTasks,
    createTask,
    updateTask,
    deleteTask
} = require("../controllers/taskController");

const protect = require("../middleware/authMiddleware");

// GET /tasks
router.get("/", protect, getTasks);

// POST /tasks
router.post("/", protect, createTask);

// PUT /tasks/:id
router.put("/:id", protect, updateTask);

// DELETE /tasks/:id
router.delete("/:id", protect, deleteTask);

module.exports = router;