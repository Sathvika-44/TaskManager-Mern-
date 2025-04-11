import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
  status: { type: String, enum: ["To Do", "In Progress", "Completed"], default: "To Do" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ✅ Ensure userId is required
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);
export default Task;
