import Task from "../models/Task.js";

// GET /api/tasks – Retrieve tasks for the authenticated user
export const getTasks = async (req, res) => {
  try {
    console.log("📥 Incoming request to GET /api/tasks");
    console.log("🔑 Authenticated User ID:", req.user);
    
    // Find tasks belonging to the logged-in user
    const tasks = await Task.find({ userId: req.user.userId });
    res.json(tasks);
  } catch (error) {
    console.error("🔥 Error fetching tasks:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// POST /api/tasks – Create a new task for the authenticated user
export const createTask = async (req, res) => {
  try {
    console.log("✅ Authenticated User:", req.user);
    console.log("📥 Incoming Task Data:", req.body);
    
    const { title, description, dueDate, priority, status,userId } = req.body;
    
    // Validate that title is provided
    if (!title) {
      return res.status(400).json({ message: "Task title is required." });
    }
    
    // Create the task data, overriding any userId from req.body with the authenticated user's id
    const taskData = {
      title,
      description: description || "",
      dueDate: dueDate || null,
      priority: priority || "Medium",
      status: status || "To Do",
      userId: req.user.userId,  // Use userId from the JWT payload
    };

    const task = new Task(taskData);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error("🔥 Task creation failed:", error.message);
    res.status(500).json({ message: "Server Error: Unable to create task" });
  }
};

// PUT /api/tasks/:id – Update an existing task (only if it belongs to the user)
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    // Ensure only tasks owned by the authenticated user can be updated
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, userId: req.user.userId },
      req.body,
      { new: true }
    );
    
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    
    res.json(updatedTask);
  } catch (error) {
    console.error("🔥 Task update failed:", error.message);
    res.status(500).json({ message: "Server Error: Unable to update task" });
  }
};

// DELETE /api/tasks/:id – Delete a task if it belongs to the authenticated user
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    // Only allow deletion if the task belongs to the user
    const deletedTask = await Task.findOneAndDelete({ _id: id, userId: req.user.userId });
    
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("🔥 Task deletion failed:", error.message);
    res.status(500).json({ message: "Server Error: Unable to delete task" });
  }
};
