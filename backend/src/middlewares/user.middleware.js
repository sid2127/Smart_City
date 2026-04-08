import db from '../db/index.js'
import jwt from "jsonwebtoken";


const verifyJwt = async (req, res, next) => {

    const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );

        const [rows] = await db.query(
            `SELECT * FROM users WHERE id = ?`,
            [decoded?.id]
        )

        if (rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            });
        }

        req.user = rows[0];
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Token expired"
        });
    }
};

export {verifyJwt}
