// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import taskRoutes from "./routes/task_routes.js";
// import authRoutes from "./routes/auth_routes.js";
// import connectDB from "./config/connectDB.js";

// dotenv.config();

// const app = express();

// const allowedOrigins = [
//   "http://localhost:3000",
//   "https://task-manager-mern-client.vercel.app"
// ];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// };


// app.use(cors(corsOptions));
// app.use(express.json());
// app.use(cookieParser());


// const startServer = async () => {
//   try {
//     await connectDB();
//     console.log("✅ MongoDB Connected");

//     app.listen(process.env.PORT || 5000, () => {
//       console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
//     });
//   } catch (err) {
//     console.error("❌ DB Connection Error:", err.message);
//     process.exit(1);
//   }
// };


// app.use("/api/tasks", taskRoutes);
// app.use("/api/auth", authRoutes);

// // Health check route
// app.get("/", (req, res) => {
//   res.send("🚀 Task Manager API is running");
// });

// startServer();

// // Start Server
// // app.listen(PORT, async () => {
// //   await connectDB();
// //   console.log(`🚀 Server running on port ${PORT}`);
// // });

// export default app;

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import taskRoutes from "./routes/task_routes.js";
import authRoutes from "./routes/auth_routes.js";
import connectDB from "./config/connectDB.js";

dotenv.config();

const app = express();

// ✅ CORS Configuration
const allowedOrigins = [
  "http://localhost:3000",
  "https://task-manager-mern-client.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Health check route (optional outside startServer)
app.get("/", (req, res) => {
  res.send("🚀 Task Manager API is running");
});

// ✅ Move routes inside after DB connection is successful
const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB Connected");

    // Register routes only after DB is connected
    app.use("/api/tasks", taskRoutes);
    app.use("/api/auth", authRoutes);

    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  } catch (err) {
    console.error("❌ DB Connection Error:", err.message);
    process.exit(1);
  }
};

startServer();

export default app;
