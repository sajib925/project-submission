import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import AppError from "../errorHelper/appError.js";

export const requireRole = (...allowedRoles: Array<"STUDENT" | "MENTOR" | "ADMIN">) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (!userRole || !allowedRoles.includes(userRole as any)) {
      return next(new AppError(httpStatus.FORBIDDEN, "You do not have permission to access this resource"));
    }

    next();
  };
};