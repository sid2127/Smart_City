import dotenv from "dotenv";
import 'dotenv/config';

dotenv.config({
    path: './.env'
});

import { app } from "./app.js";
import { connectdb, db } from "./src/db/index.js"; // 👈 import db also

console.log(process.env.PORT);

const PORT = process.env.PORT || 3001;

// ✅ CREATE TABLE FUNCTION
const createTables = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        password VARCHAR(255),
        role ENUM('user', 'admin', 'officer') NOT NULL,
        department ENUM(
          'water',
          'electricity',
          'road',
          'sanitation',
          'public_safety'
        ),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS complaints (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        assigned_to INT DEFAULT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        department ENUM(
          'water',
          'electricity',
          'road',
          'sanitation',
          'public_safety'
        ) NOT NULL,
        status ENUM(
          'pending',
          'assigned',
          'in_progress',
          'resolved',
          'rejected'
        ) DEFAULT 'pending',
        priority ENUM(
          'low',
          'medium',
          'high'
        ) DEFAULT 'medium',
        address TEXT,
        image_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL
      );
    `);

    console.log("Tables created ✅");
  } catch (error) {
    console.error("Table creation error ❌", error);
  }
};

// 🔥 MODIFY THIS PART
connectdb()
.then(async () => {
    await createTables(); // 👈 ADD THIS LINE

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((error)=> {
    console.log("Error while running server" , error);
});