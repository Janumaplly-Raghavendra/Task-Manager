
const mongoose = require("mongoose");
const Task = require("../models/Task");


// GET /tasks
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({
            user: req.user.userId
        });

        res.json(tasks);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch tasks"
        });
    }
};

// POST /tasks
// POST /tasks
const createTask = async (req, res) => {
    try {
        const {
            title,
            completed,
            dueDate,
            priority,
            category
        } = req.body;

        if (!title || typeof title !== "string" || title.trim() === "") {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        if (completed !== undefined && typeof completed !== "boolean") {
            return res.status(400).json({
                message: "Completed must be true or false"
            });
        }

        if (
            priority !== undefined &&
            !["low", "medium", "high"].includes(priority)
        ) {
            return res.status(400).json({
                message: "Invalid priority"
            });
        }

        if (
            category !== undefined &&
            !["work", "personal", "study", "other"].includes(category)
        ) {
            return res.status(400).json({
                message: "Invalid category"
            });
        }

        const newTask = await Task.create({
            title: title.trim(),
            completed: completed ?? false,
            dueDate: dueDate || undefined,
            priority: priority || "medium",
            category: category || "other",
            user: req.user.userId
        });

        res.status(201).json({
            message: "Task created successfully",
            task: newTask
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create task"
        });
    }
};


// PUT /tasks/:id
const updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        if (!mongoose.isValidObjectId(taskId)) {
            return res.status(400).json({
                message: "Invalid task ID"
            });
        }

        const {
            title,
            completed,
            dueDate,
            priority,
            category
        } = req.body;

        if (
            priority !== undefined &&
            !["low", "medium", "high"].includes(priority)
        ) {
            return res.status(400).json({
                message: "Invalid priority"
            });
        }

        if (
            category !== undefined &&
            !["work", "personal", "study", "other"].includes(category)
        ) {
            return res.status(400).json({
                message: "Invalid category"
            });
        }

        if (completed !== undefined && typeof completed !== "boolean") {
            return res.status(400).json({
                message: "Completed must be true or false"
            });
        }

        if (
            title !== undefined &&
            (typeof title !== "string" || title.trim() === "")
        ) {
            return res.status(400).json({
                message: "Title cannot be empty"
            });
        }

        const updatedTask = await Task.findOneAndUpdate(
            {
                _id: taskId,
                user: req.user.userId
            },
            {
                ...(title !== undefined && { title: title.trim() }),
                ...(completed !== undefined && { completed })
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedTask) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json({
            message: "Task updated successfully",
            task: updatedTask
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update task"
        });
    }
};


// DELETE /tasks/:id
const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        if (!mongoose.isValidObjectId(taskId)) {
            return res.status(400).json({
                message: "Invalid task ID"
            });
        }
        const deletedTask = await Task.findOneAndDelete({
            _id: taskId,
            user: req.user.userId
        });

        // Task not found
        if (!deletedTask) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json({
            message: "Task deleted successfully",
            task: deletedTask
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete task"
        });
    }
};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};