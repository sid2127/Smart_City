import 'dotenv/config';  // ⭐ MUST (loads .env)

import { db } from "../src/db/index.js";
import bcrypt from "bcryptjs";

const createAdmin = async () => {
  try {
    console.log("⏳ Creating admin...");

    // 🔹 Check if admin already exists
    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      ["admin@gmail.com"]
    );

    if (rows.length > 0) {
      console.log("⚠️ Admin already exists");
      process.exit();
    }

    // 🔹 Hash password
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // 🔹 Insert admin
    await db.query(
      `INSERT INTO users (name, email, password, role)
       VALUES (?, ?, ?, 'admin')`,
      ["Admin", "admin@gmail.com", hashedPassword]
    );

    console.log("✅ Admin created successfully!");
    process.exit();

  } catch (error) {
    console.error("❌ Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();