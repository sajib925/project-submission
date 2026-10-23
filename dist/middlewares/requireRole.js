import httpStatus from "http-status-codes";
import AppError from "../errorHelper/appError.js";
export const requireRole = (...allowedRoles) => {
    return (req, _res, next) => {
        const userRole = req.user?.role;
        if (!userRole || !allowedRoles.includes(userRole)) {
            return next(new AppError(httpStatus.FORBIDDEN, "You do not have permission to access this resource"));
        }
        next();
    };
};
