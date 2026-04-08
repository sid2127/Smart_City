import db from '../db/index.js';
import bcrypt from 'bcryptjs';
import { generateAccessToken } from '../utils/jwt.js';


// ================= SIGNUP =================
const SignUp = async (req, res) => {
  try {
    const { name, email, password, role, department } = req.body;

    // 🔹 validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // 🔹 check existing user
    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    // 🔹 hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔹 insert user
    const [result] = await db.query(
      `INSERT INTO users (name, email, password, role, department)
       VALUES (?, ?, ?, ?, ?)`,
      [name, email, hashedPassword, role, department || null]
    );

    // 🔹 generate token (IMPORTANT FIX)
    const token = generateAccessToken({
      id: result.insertId,
      email: email,
      name: name,
      role: role
    });

    return res.status(201).json({
      success: true,
      message: "Signup successful",
      token,
      user: {
        id: result.insertId,
        name,
        email,
        role,
        department
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Signup failed",
      error: error.message
    });
  }
};



// ================= LOGIN =================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔹 validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    // 🔹 find user
    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "User not found"
      });
    }

    const user = rows[0];

    // 🔹 compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password"
      });
    }

    // 🔹 generate token
    const token = generateAccessToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message
    });
  }
};



// ================= LOGOUT =================
const logout = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Logout successful (remove token from frontend)"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed"
    });
  }
};


export { SignUp, login, logout };