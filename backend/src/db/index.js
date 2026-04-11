import mysql from "mysql2/promise";

// 🔹 Create pool using Railway URL
const db = mysql.createPool(process.env.MYSQL_URL);

// 🔹 Test DB connection
const connectdb = async () => {
  try {
    const connection = await db.getConnection();
    console.log("MySQL Connected ✅");
    connection.release();
  } catch (error) {
    console.error("MySQL Connection Failed ❌", error.message);
    process.exit(1);
  }
};

export { db, connectdb };