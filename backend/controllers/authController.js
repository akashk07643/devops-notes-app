const { pool } = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Register User
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Simple validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    // Check if user already exists
    const [existingUsers] = await pool.execute(
      "SELECT * FROM Users WHERE username = ? OR email = ?",
      [username, email]
    );

    if (existingUsers.length > 0) {
      const existingUser = existingUsers[0];
      if (existingUser.email.toLowerCase() === email.toLowerCase()) {
        return res.status(400).json({ message: "Email is already registered" });
      }
      return res.status(400).json({ message: "Username is already taken" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user into database
    await pool.execute(
      "INSERT INTO Users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Register Error:", error.message);
    return res.status(500).json({ message: "Internal server error during registration" });
  }
};

// Login User
const login = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    // Simple validation
    if (!emailOrUsername || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Fetch user by email or username
    const [users] = await pool.execute(
      "SELECT * FROM Users WHERE email = ? OR username = ?",
      [emailOrUsername, emailOrUsername]
    );

    if (users.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = users[0];

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET || "supersecretkeyformynotesapp12345!", {
      expiresIn: "24h",
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    return res.status(500).json({ message: "Internal server error during login" });
  }
};

module.exports = {
  register,
  login,
};
