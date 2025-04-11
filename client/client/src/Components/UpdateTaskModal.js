import React, { useState } from "react";

const UpdateTaskModal = ({ task, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    dueDate: task?.dueDate || "",
    priority: task?.priority || "Medium",
    status: task?.status || "To Do",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...task, ...formData });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-md shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-3">Update Task</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Task Title" required />
          <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Task Description"></textarea>
          <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} className="w-full border p-2 rounded" />
          
          <select name="priority" value={formData.priority} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>

          {/* Status Field Now Inside Update Modal */}
          <select name="status" value={formData.status} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="bg-gray-400 px-3 py-1 rounded text-white">Cancel</button>
            <button type="submit" className="bg-blue-500 px-3 py-1 rounded text-white hover:bg-blue-700">Update Task</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTaskModal;
