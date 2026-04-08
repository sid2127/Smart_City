import mysql from "mysql2/promise";

// 🔹 Create pool
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: process.env.MYSQL_PASSWORD,
    database: "smartCity",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// 🔹 Test DB connection
const connectdb = async () => {
    try {
        const connection = await db.getConnection();
        console.log("MySQL Connected ✅");
        connection.release(); // important
    } catch (error) {
        console.error("MySQL Connection Failed ❌", error.message);
        process.exit(1);
    }
};

export { db, connectdb };