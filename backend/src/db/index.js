import mysql from "mysql2/promise";

const connectdb = async () => {
    try {
        const connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: process.env.MYSQL_PASSWORD,
            database: "smartCity"
        });

        console.log("MySQL Connected ✅");

        return connection; // 🔥 IMPORTANT

    } catch (error) {
        console.log("Error connecting to DB ❌", error);
        process.exit(1); // stop server if DB fails
    }
};

export { connectdb };