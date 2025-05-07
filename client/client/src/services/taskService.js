
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_URL = `${BASE_URL}/api/tasks`;

// Get Authorization Header
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  console.log("🔑 Token being sent:", token);
  return { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } };
};


// Handle API Errors
const handleApiError = (error) => {
  if (error.response) {
    console.error("API Error:", error.response.data?.message || "Unknown error");
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      window.location.href = "/login"; // Redirect to login if unauthorized
    }
  } else {
    console.error("Network Error:", error.message);
  }
  throw error;
};

// Fetch Tasks
export const getTasks = async () => {
  try {
    const response = await axios.get(API_URL, getAuthHeader());
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Create Task
export const createTask = async (taskData) => {
  try {
    const response = await axios.post(API_URL, taskData, getAuthHeader());
    console.log("✅ Task Created Successfully:", response.data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Update Task
export const updateTask = async (taskId, taskData) => {
  try {
    const response = await axios.put(`${API_URL}/${taskId}`, taskData, getAuthHeader());
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Delete Task
export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`${API_URL}/${taskId}`, getAuthHeader());
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
