import httpStatus from "http-status-codes";
import AppError from "../errorHelper/appError.js";
import { verifyToken } from "../utils/jwt.js";
import { db } from "../config/db.js";
export const checkAuth = () => {
    return async (req, _res, next) => {
        try {
            const token = req.cookies?.accessToken ||
                req.headers.authorization?.split(" ")[1];
            if (!token) {
                throw new AppError(httpStatus.UNAUTHORIZED, "No access token provided");
            }
            // Verify JWT
            const decoded = verifyToken(token, process.env.JWT_ACCESS_SECRET);
            // Check if user exists in Prisma DB
            const user = await db.user.findUnique({ where: { id: decoded.userId } });
            if (!user) {
                throw new AppError(httpStatus.UNAUTHORIZED, "User not found");
            }
            // Attach user info to request
            req.user = {
                userId: user.id,
                email: user.email,
                role: user.role,
            };
            next();
        }
        catch (err) {
            if (err instanceof AppError) {
                return next(err);
            }
            next(new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access"));
        }
    };
};
