const API_URL = "";

let token = localStorage.getItem("token");
let tasks = [];

// =========================
// Reusable API Request
// =========================

async function apiFetch(endpoint, options = {}) {

    const headers = {
        ...options.headers,
        "Authorization": `Bearer ${token}`
    };

    const response = await fetch(
        `${API_URL}${endpoint}`,
        {
            ...options,
            headers
        }
    );

    if (response.status === 401) {

        logoutUser();

        showNotification(
            "Session expired. Please login again."
        );

        throw new Error("Unauthorized");
    }

    return response;
}

const dueDateInput = document.getElementById("dueDateInput");
const priorityInput = document.getElementById("priorityInput");
const categoryInput = document.getElementById("categoryInput");

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");

//Notification
const notification = document.getElementById("notification");

//Function
function showNotification(message) {
    notification.textContent = message;
    notification.style.display = "block";

    setTimeout(() => {
        notification.style.display = "none";
    }, 2500);
}

const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");

const loadingMessage = document.getElementById("loadingMessage");


const authSection = document.getElementById("authSection");
const taskSection = document.getElementById("taskSection");
const logoutBtn = document.getElementById("logoutBtn");

//tab logic
const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");
const nameField = document.getElementById("nameField");

function showLoginForm() {
    nameField.style.display = "none";

    loginBtn.style.display = "block";
    registerBtn.style.display = "none";

    loginTab.classList.add("active");
    registerTab.classList.remove("active");
}

function showRegisterForm() {
    nameField.style.display = "flex";

    loginBtn.style.display = "none";
    registerBtn.style.display = "block";

    registerTab.classList.add("active");
    loginTab.classList.remove("active");
}

loginTab.addEventListener("click", showLoginForm);

registerTab.addEventListener("click", showRegisterForm);

showLoginForm();

//ForgotPassword
const forgotPasswordLink =
    document.getElementById(
        "forgotPasswordLink"
    );

//search/filter
const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("filterSelect");
const sidebarAddTask =
    document.getElementById("sidebarAddTask");

function displayTasks() {

    const searchText =
        searchInput.value.toLowerCase().trim();

    const filter =
        filterSelect.value;

    const filteredTasks = tasks.filter(task => {

        const matchesSearch =
            task.title
                .toLowerCase()
                .includes(searchText);

        const matchesFilter =
            filter === "all" ||
            (filter === "completed" && task.completed) ||
            (filter === "pending" && !task.completed);

        return matchesSearch && matchesFilter;
    });


    // Update task count

    const taskCountLabel =
        document.getElementById("taskCountLabel");

    taskCountLabel.textContent =
        `${filteredTasks.length} ${filteredTasks.length === 1
            ? "task"
            : "tasks"
        }`;


    // No tasks at all

    if (tasks.length === 0) {

        taskList.innerHTML = `
            <div class="empty-state">

                <div class="empty-icon">
                    📝
                </div>

                <h3>No tasks yet</h3>

                <p>
                    Add your first task to get started!
                </p>

            </div>
        `;

        return;
    }


    // No search/filter results

    if (filteredTasks.length === 0) {

        taskList.innerHTML = `
            <div class="empty-state">

                <div class="empty-icon">
                    🔍
                </div>

                <h3>No matching tasks</h3>

                <p>
                    Try changing your search or filter.
                </p>

            </div>
        `;

        return;
    }


    taskList.innerHTML = "";


    filteredTasks.forEach(task => {

        const taskElement =
            document.createElement("div");

        taskElement.className = "task";


        // Checkbox

        const checkbox =
            document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.className = "task-check";

        checkbox.checked = task.completed;

        checkbox.addEventListener(
            "change",
            () => toggleTask(
                task._id,
                task.completed
            )
        );


        // Task information

        const infoElement =
            document.createElement("span");


        const titleElement =
            document.createElement("strong");

        titleElement.textContent =
            task.title;


        const metaElement =
            document.createElement("small");

        let metaText =
            `${task.category || "other"} • ` +
            `${task.priority || "medium"} priority`;

        if (task.dueDate) {

            metaText +=
                ` • Due ${new Date(
                    task.dueDate
                ).toLocaleDateString()
                }`;
        }

        metaElement.textContent = metaText;

        metaElement.className =
            "task-meta";


        infoElement.appendChild(
            titleElement
        );

        infoElement.appendChild(
            metaElement
        );


        if (task.completed) {
            infoElement.classList.add(
                "completed"
            );
        }


        // Buttons

        const buttonsElement =
            document.createElement("div");


        const completeButton =
            document.createElement("button");

        completeButton.textContent =
            task.completed
                ? "Undo"
                : "Complete";

        completeButton.addEventListener(
            "click",
            () => toggleTask(
                task._id,
                task.completed
            )
        );


        const editButton =
            document.createElement("button");

        editButton.textContent = "Edit";

        editButton.addEventListener(
            "click",
            () => editTask(task._id)
        );


        const deleteButton =
            document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.addEventListener(
            "click",
            () => deleteTask(task._id)
        );


        buttonsElement.appendChild(
            completeButton
        );

        buttonsElement.appendChild(
            editButton
        );

        buttonsElement.appendChild(
            deleteButton
        );


        // Build card

        taskElement.appendChild(
            checkbox
        );

        taskElement.appendChild(
            infoElement
        );

        taskElement.appendChild(
            buttonsElement
        );


        taskList.appendChild(
            taskElement
        );

    });
}

// Register User

async function registerUser() {

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!name || !email || !password) {
        alert("Please fill all fields");
        return;
    }

    try {

        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        });

        const data = await response.json();

        console.log(data);

        if (!response.ok) {
            showNotification(data.message);
            return;
        }

        showNotification("Registration successful! Now login.");

        // Clear fields
        nameInput.value = "";
        emailInput.value = "";
        passwordInput.value = "";

    } catch (error) {
        console.error("Registration error:", error);
        alert("Unable to connect to server");
    }
}

registerBtn.addEventListener("click", registerUser);

//login

async function loginUser() {

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
        alert("Please enter email and password");
        return;
    }

    try {

        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();

        console.log(data);

        if (!response.ok) {
            alert(data.message);
            return;
        }

        // Save JWT token
        localStorage.setItem("token", data.token);
        token = data.token;

        showNotification("Login successful!");

        showTaskSection();

    } catch (error) {
        console.error("Login error:", error);
        alert("Unable to connect to server");
    }
}

loginBtn.addEventListener("click", loginUser);
//
function showTaskSection() {
    authSection.style.display = "none";
    taskSection.style.display = "block";

    loadTasks();
}

//forgot password

forgotPasswordLink.addEventListener(
    "click",
    async (event) => {

        event.preventDefault();

        const email =
            emailInput.value.trim();

        if (!email) {

            showNotification(
                "Enter your email first"
            );

            emailInput.focus();

            return;
        }


        try {

            const response =
                await fetch(
                    `${API_URL}/auth/forgot-password`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            email: email
                        })
                    }
                );


            const data =
                await response.json();


            showNotification(
                data.message ||
                "Password reset request sent"
            );


        } catch (error) {

            console.error(
                "Forgot password error:",
                error
            );

            showNotification(
                "Unable to connect to server"
            );
        }
    }
);

//Logout
function logoutUser() {

    localStorage.removeItem("token");

    token = null;

    taskSection.style.display = "none";
    authSection.style.display = "block";

    taskList.innerHTML = "";

    showNotification("Logged out successfully");
}

logoutBtn.addEventListener("click", logoutUser);


// =========================
// Load Tasks
// =========================

async function loadTasks() {

    loadingMessage.style.display = "block";

    try {

        const response = await apiFetch("/tasks");

        const data = await response.json();

        if (!response.ok) {

            showNotification(
                data.message || "Failed to load tasks"
            );

            return;
        }


        // Store tasks
        tasks = data;


        // =========================
        // TASK COUNTS
        // =========================

        const totalTasks =
            document.getElementById("totalTasks");

        const completedTasks =
            document.getElementById("completedTasks");

        const pendingTasks =
            document.getElementById("pendingTasks");

        const sidebarAddTask =
            document.getElementById("sidebarAddTask");


        const completed =
            tasks.filter(task => task.completed).length;


        totalTasks.textContent =
            tasks.length;

        completedTasks.textContent =
            completed;

        pendingTasks.textContent =
            tasks.length - completed;

        // Category counts

        document.getElementById("workCount").textContent =
            tasks.filter(
                task => task.category === "work"
            ).length;

        document.getElementById("personalCount").textContent =
            tasks.filter(
                task => task.category === "personal"
            ).length;

        document.getElementById("studyCount").textContent =
            tasks.filter(
                task => task.category === "study"
            ).length;

        document.getElementById("otherCount").textContent =
            tasks.filter(
                task => task.category === "other"
            ).length;


        // Priority counts

        document.getElementById("highCount").textContent =
            tasks.filter(
                task => task.priority === "high"
            ).length;

        document.getElementById("mediumCount").textContent =
            tasks.filter(
                task => task.priority === "medium"
            ).length;

        document.getElementById("lowCount").textContent =
            tasks.filter(
                task => task.priority === "low"
            ).length;


        taskCountLabel.textContent =
            `${tasks.length} ${tasks.length === 1 ? "task" : "tasks"
            }`;


        // =========================
        // CATEGORY COUNTS
        // =========================

        document.getElementById("workCount").textContent =
            tasks.filter(
                task => task.category === "work"
            ).length;

        document.getElementById("personalCount").textContent =
            tasks.filter(
                task => task.category === "personal"
            ).length;

        document.getElementById("studyCount").textContent =
            tasks.filter(
                task => task.category === "study"
            ).length;

        document.getElementById("otherCount").textContent =
            tasks.filter(
                task => task.category === "other"
            ).length;


        // =========================
        // PRIORITY COUNTS
        // =========================

        document.getElementById("highCount").textContent =
            tasks.filter(
                task => task.priority === "high"
            ).length;

        document.getElementById("mediumCount").textContent =
            tasks.filter(
                task => task.priority === "medium"
            ).length;

        document.getElementById("lowCount").textContent =
            tasks.filter(
                task => task.priority === "low"
            ).length;


        // =========================
        // DISPLAY TASKS
        // =========================

        displayTasks();


    } catch (error) {

        console.error(
            "Error loading tasks:",
            error
        );

        showNotification(
            "Unable to load tasks"
        );

    } finally {

        loadingMessage.style.display = "none";
    }
}



// =========================
// Add Task
// =========================

async function addTask() {

    const title = taskInput.value.trim();

    if (!title) {
        showNotification("Please enter a task");
        return;
    }

    try {

        const response = await apiFetch("/tasks", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                title: title,
                dueDate: dueDateInput.value || undefined,
                priority: priorityInput.value,
                category: categoryInput.value
            })

        });

        const data = await response.json();

        if (!response.ok) {

            showNotification(
                data.message || "Failed to add task"
            );

            return;
        }

        dueDateInput.value = "";
        priorityInput.value = "medium";
        categoryInput.value = "other";

        showNotification(
            "Task added successfully!"
        );

        loadTasks();

    } catch (error) {

        console.error(
            "Error adding task:",
            error
        );

    }
}

// =========================
// Complete / Undo Task
// =========================

async function toggleTask(taskId, currentStatus) {

    try {

        const response = await apiFetch(`/tasks/${taskId}`, {
            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                completed: !currentStatus
            })
        });

        const data = await response.json();

        if (!response.ok) {
            showNotification(data.message || "Failed to update task");
            return;
        }

        loadTasks();

    } catch (error) {
        console.error("Toggle error:", error);
    }
}

// =========================
// Edit Task
// =========================

async function editTask(taskId) {

    const task = tasks.find(
        task => task._id === taskId
    );

    if (!task) {
        return;
    }


    // Edit title

    const newTitle = prompt(
        "Edit task title:",
        task.title
    );

    if (newTitle === null) {
        return;
    }

    const trimmedTitle =
        newTitle.trim();

    if (!trimmedTitle) {

        showNotification(
            "Task title cannot be empty"
        );

        return;
    }


    // Edit priority

    const newPriority = prompt(
        "Priority (low / medium / high):",
        task.priority || "medium"
    );

    if (newPriority === null) {
        return;
    }

    const priority =
        newPriority.toLowerCase().trim();

    if (
        !["low", "medium", "high"]
            .includes(priority)
    ) {

        showNotification(
            "Invalid priority"
        );

        return;
    }


    // Edit category

    const newCategory = prompt(
        "Category (work / personal / study / other):",
        task.category || "other"
    );

    if (newCategory === null) {
        return;
    }

    const category =
        newCategory.toLowerCase().trim();

    if (
        ![
            "work",
            "personal",
            "study",
            "other"
        ].includes(category)
    ) {

        showNotification(
            "Invalid category"
        );

        return;
    }


    // Edit due date

    const currentDueDate =
        task.dueDate
            ? new Date(task.dueDate)
                .toISOString()
                .split("T")[0]
            : "";

    const newDueDate = prompt(
        "Due date (YYYY-MM-DD), leave empty for none:",
        currentDueDate
    );

    if (newDueDate === null) {
        return;
    }


    try {

        const response = await apiFetch(
            `/tasks/${taskId}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    title: trimmedTitle,

                    priority: priority,

                    category: category,

                    dueDate:
                        newDueDate.trim()
                            ? newDueDate.trim()
                            : null

                })
            }
        );


        const data =
            await response.json();


        if (!response.ok) {

            showNotification(
                data.message ||
                "Failed to update task"
            );

            return;
        }


        showNotification(
            "Task updated successfully!"
        );

        loadTasks();


    } catch (error) {

        console.error(
            "Edit error:",
            error
        );

        showNotification(
            "Unable to update task"
        );
    }
}


// =========================
// Delete Task
// =========================

async function deleteTask(taskId) {

    if (!confirm("Are you sure you want to delete this task?")) {
        return;
    }

    try {

        const response = await apiFetch(`/tasks/${taskId}`, {
            method: "DELETE"
        });

        const data = await response.json();

        if (!response.ok) {
            showNotification(data.message || "Failed to delete task");
            return;
        }

        showNotification("Task deleted!");

        loadTasks();

    } catch (error) {
        console.error("Delete error:", error);
    }
}


// =========================
// Button Events
// =========================

addTaskBtn.addEventListener("click", addTask);

//Enter key to add task
taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});
sidebarAddTask.addEventListener("click", () => {

    taskInput.focus();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

sidebarAddTask.addEventListener("click", () => {

    taskInput.focus();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

//darkmode
const darkModeBtn = document.getElementById("darkModeBtn");

function applyTheme() {

    const darkMode =
        localStorage.getItem("darkMode") === "true";

    if (darkMode) {

        document.body.classList.remove("light-mode");

        darkModeBtn.textContent = "☀️ Light Mode";

    } else {

        document.body.classList.add("light-mode");

        darkModeBtn.textContent = "🌙 Dark Mode";
    }
}


darkModeBtn.addEventListener("click", () => {

    const currentlyDark =
        localStorage.getItem("darkMode") === "true";

    localStorage.setItem(
        "darkMode",
        !currentlyDark
    );

    applyTheme();
});


applyTheme();

// Load tasks when page opens
if (token) {
    showTaskSection();
}

searchInput.addEventListener("input", displayTasks);

filterSelect.addEventListener("change", displayTasks);