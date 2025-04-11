import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTasks, createTask, updateTask, deleteTask } from "../services/taskService";
import AddTaskModal from "./AddTaskModal";
import UpdateTaskModal from "./UpdateTaskModal";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [sortCriterion, setSortCriterion] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      loadTasks();
    }
  }, [navigate, token]);

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data || []);
  };

  const handleAddTask = async (taskData) => {
    if (!taskData.title.trim()) {
      alert("Task title is required");
      return;
    }

    const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage
    const taskWithUser = { ...taskData, userId }; // Ensure userId is included
    console.log("📤 Creating Task:", taskWithUser); // Debugging log

    await createTask(taskWithUser);
    loadTasks();
    setShowAddModal(false);
  };


  const handleUpdateTask = async (taskData) => {
    await updateTask(taskData._id, taskData);
    loadTasks();
    setShowUpdateModal(false);
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  const handlePriorityFilter = (priority) => {
    setSelectedPriority(priority);
  };

  const handleSortChange = (criterion) => {
    setSortCriterion(criterion);
  };

  const filteredTasks = tasks
  .filter(task =>
    selectedPriority === "All" || task.priority === selectedPriority
  )
  .filter(task =>
    searchTitle ? task.title.toLowerCase().includes(searchTitle.toLowerCase()) : true
  )
  .filter(task =>
    statusFilter ? task.status === statusFilter : true
  );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortCriterion === "dueDate") {
      return new Date(a.dueDate) - new Date(b.dueDate);
    } else if (sortCriterion === "priority") {
      const priorityOrder = { "High": 1, "Medium": 2, "Low": 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return 0;
  });

  return (
    <div className="bg-blue-600 m-2 min-h-screen px-2 md:px-4">
      <h2 className="p-4 text-2xl md:text-3xl font-bold text-white text-center">My Tasks</h2>
      <div className="max-w-3xl mx-auto p-4 ">
         {/* Filters & Sorting */}
        <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
          {/* <h2 className="text-2xl md:text-3xl font-bold text-white">My Tasks</h2> */}
          {/* Title Filter */}
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="p-2 rounded bg-white text-gray-800"
          />

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 rounded bg-white text-gray-800"
          >
            <option value="">All Status</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="To Do">To Do</option>
          </select>
          {/* Sorting Dropdown */}
          <div className="my-auto">
            <select
              onChange={(e) => handleSortChange(e.target.value)}
              value={sortCriterion}
              className="p-2 text-sm md:text-base rounded bg-gray-200 text-gray-800"
            >
              <option value="">Sort </option>
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority</option>
            </select>
          </div>
           {/* Priority Filter */}
          <div className="flex space-x-1 md:space-x-2 bg-white p-1 rounded">
            {["All", "Low", "Medium", "High"].map((priority) => (
              <button
                key={priority}
                onClick={() => handlePriorityFilter(priority)}
                className={`p-1 rounded ${selectedPriority === priority
                  ? "bg-gray-400 text-white"
                  : "bg-white text-gray"
                  }`}
              >
                {priority}
              </button>
            ))}
          </div>
           {/* Add Task Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            + Add Task
          </button>
        </div>
        {/* Task List */}
        {token ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sortedTasks.map((task) => (
              <div key={task._id} className="bg-white shadow-md rounded-md p-4 flex flex-col space-y-2 border">
                <h3 className="text-lg font-semibold">Title: {task.title}</h3>
                <p className="text-gray-600 ">Description: {task.description}</p>
                <div className="text-sm text-gray-500 ">
                  <span>Due Date: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No Due Date"}</span>
                </div>
                <span className={`text-sm font-bold ${task.priority === "High" ? "text-red-500" : task.priority === "Medium" ? "text-yellow-500" : "text-green-500"}`}>
                  {task.priority} Priority
                </span>
                <div className="text-sm font-medium ">
                  Status: <span className={`px-2 py-1 rounded ${task.status === "Completed" ? "bg-green-200 text-green-800" : task.status === "In Progress" ? "bg-yellow-200 text-yellow-800" : "bg-gray-200 text-gray-800"}`}>{task.status}</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setSelectedTask(task);
                      setShowUpdateModal(true);
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            <div
              onClick={() => setShowAddModal(true)}
              className="bg-white border-2 border-dashed border-gray-600 p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 rounded-md"
            >
              <span className="text-gray-500">+ Add Task</span>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600">Please log in to view your tasks.</p>
        )}
        {showAddModal && <AddTaskModal onClose={() => setShowAddModal(false)} onSubmit={handleAddTask} />}
        {showUpdateModal && <UpdateTaskModal task={selectedTask} onClose={() => setShowUpdateModal(false)} onSubmit={handleUpdateTask} />}
      </div>
    </div >
  );
};

export default TaskList;
