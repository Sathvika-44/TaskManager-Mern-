import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const TaskContext = createContext();

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/tasks`).then(res => setTasks(res.data));
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};
