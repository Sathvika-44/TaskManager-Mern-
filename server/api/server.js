import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import taskRoutes from "../routes/task_routes.js";
import authRoutes from "../routes/auth_routes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true, // allow cookies across origins
}));
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// MongoDB connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log("MongoDB Connected"))
// .catch(err => console.log(err));

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1); // exit on DB failure
  }
};


app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Health check route
app.get("/", (req, res) => {
  res.send("🚀 Task Manager API is running");
});

// Start Server
// app.listen(PORT, async () => {
//   await connectDB();
//   console.log(`🚀 Server running on port ${PORT}`);
// });

module.exports = app;