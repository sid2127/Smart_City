import { db } from '../db/index.js';
import bcrypt from 'bcryptjs';
import { generateAccessToken } from '../utils/jwt.js';
import { sentOtp } from '../utils/mail.js';


const generatePassword = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$!";

  let password = "";

  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  return password;
};


// ================= SIGNUP =================
const SignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
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

    const role = "user"; // 🔥 FIX

    const [result] = await db.query(
      `INSERT INTO users (name, email, password, role, department)
       VALUES (?, ?, ?, ?, ?)`,
      [name, email, hashedPassword, role, null]
    );

    const token = generateAccessToken({
      id: result.insertId,
      email,
      name,
      role
    });

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });

    return res.status(201).json({
      success: true,
      message: "Signup successful",
      user: {
        id: result.insertId,
        name,
        email,
        role
      }
    });

  } catch (error) {
    console.error(error); // 🔥 add this for debugging
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
      secure: true,
      sameSite: "none"
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


// LOGOUT 
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


const createOfficer = async (req, res) => {
  try {

    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can create officers"
      });
    }

    const { name, email, department } = req.body;

    if (!name || !email || !department) {
      return res.status(400).json({
        success: false,
        message: "All fields required"
      });
    }

    const response = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (response[0].length > 0) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    const rawPassword = generatePassword();
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    await db.query(
      `INSERT INTO users (name, email, password, role, department)
       VALUES (?, ?, ?, 'officer', ?)`,
      [name, email, hashedPassword, department]
    );

    // 🔥 Send Email
    await sentOtp(email , rawPassword);

    return res.status(201).json({
      success: true,
      message: "Officer created and email sent successfully"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create officer"
    });
  }
};

//getUserDetails
const getUserDetails = async (req, res) => {
  try {
    const user = req.user; // 🔥 from middleware

    return res.status(200).json({
      success: true,
      message: "User Data Fetched Successfully",
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
      message: "Unable to Fetch User"
    });
  }
};

//getOfficersById

const getOfficersByComplaint = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(id);
    

    const [officers] = await db.query(
      `SELECT 
        u.id,
        u.name,
        u.email,
        COUNT(c.id) AS activeComplaints
      FROM users u
      LEFT JOIN complaints c 
        ON u.id = c.assigned_to 
        AND c.status != 'resolved'
      WHERE u.role = 'officer'
      AND u.department = (
        SELECT department 
        FROM complaints 
        WHERE id = ?
      )
      GROUP BY u.id`,
      [id]
    );

    res.status(200).json({
      success: true,
      officers,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

//getAllOfficers
const getAllOfficers = async (req , res) => {
  try {
    const [officers] = await db.query(
      `Select id , name , email , department from users where role = 'officer'`
    );


    res.status(200).json({
      success: true,
      officers,
    });
  } catch (error) {
    console.log("Error while fetching all officers" , error);
    res.status(500).json({
      success: false,
      message: "Error while fetching all officers"
    });
  }
}

const removeOfficer = async(req , res) => {
  try {
    const {id} = req.params;

    if(!id){
      return res.status(400).json({
        success: false,
        message: "Officer ID is required"
      });
    }

    const [result] = await db.query(
      "DELETE FROM users WHERE id = ? AND role = 'officer'",
      [id]
    );

    if(result.affectedRows === 0){
      return res.status(404).json({
        success: false,
        message: "Officer not found or cannot be deleted"
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete officer"
    });
  }
}

export { SignUp, login, logout, createOfficer , getUserDetails , getOfficersByComplaint , getAllOfficers , removeOfficer};