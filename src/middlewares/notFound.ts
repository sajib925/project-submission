import { type Request, type Response } from "express";
import httpStatus from "http-status-codes";

const notFound = (_req: Request, res: Response) => {
    const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
    res.header("Access-Control-Allow-Origin", FRONTEND_URL);
    res.header("Access-Control-Allow-Credentials", "true");
    
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "Route Not Found"
    })
}

export default notFound