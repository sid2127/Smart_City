import { db } from '../db/index.js';
import bcrypt from 'bcryptjs';
import { generateAccessToken } from '../utils/jwt.js';


// ================= SIGNUP =================
const SignUp = async (req, res) => {
  try {
    const { name, email, password, role, department } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

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

    const hashedPassword = await bcrypt.hash(String(password), 10);

    const [result] = await db.query(
      `INSERT INTO users (name, email, password, role, department)
       VALUES (?, ?, ?, ?, ?)`,
      [name, email, hashedPassword, role, department || null]
    );

    const token = generateAccessToken({
      id: result.insertId,
      email,
      name,
      role
    });

    // 🔥 SET COOKIE
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: false, // true in production (https)
      sameSite: "lax"
    });

    return res.status(201).json({
      success: true,
      message: "Signup successful",
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
      message: "Signup failed"
    });
  }
};


// ================= LOGIN =================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

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

    const isMatch = await bcrypt.compare(String(password), user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password"
      });
    }

    const token = generateAccessToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    });

    // 🔥 SET COOKIE
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
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
      message: "Login failed"
    });
  }
};


// ================= LOGOUT =================
const logout = async (req, res) => {
  try {
    res.clearCookie("accessToken");

    return res.json({
      success: true,
      message: "Logout successful"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed"
    });
  }
};


export { SignUp, login, logout };