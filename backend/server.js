const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { poolPromise } = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const notesRoutes = require("./routes/notesRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "*", // Adjust as necessary for production (e.g. frontend domain)
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check / Test Route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy", timestamp: new Date() });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Global Error Handler Log:", err.stack);
  res.status(500).json({ message: "An unexpected error occurred on the server" });
});

// Initialize database pool and start server
const startServer = async () => {
  try {
    // Check database connection before opening server ports
    await poolPromise;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} 🚀`);
    });
  } catch (error) {
    console.error("Failed to start server due to database connection error:", error.message);
    process.exit(1);
  }
};

startServer();
