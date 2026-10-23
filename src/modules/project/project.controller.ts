import type { Request, Response } from "express";
import httpStatus from "http-status-codes";
import type { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { ProjectServices } from "./project.service.js";

const submitProject = catchAsync(async (req: Request, res: Response) => {
  const decoded = req.user as JwtPayload;
  const result = await ProjectServices.submitProject(Number(decoded.userId), req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Project submitted successfully",
    data: result,
  });
});

const getMySubmissions = catchAsync(async (req: Request, res: Response) => {
  const decoded = req.user as JwtPayload;
  const result = await ProjectServices.getMySubmissions(Number(decoded.userId));

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "My submissions retrieved successfully",
    data: result,
  });
});

const getAllSubmissions = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectServices.getAllSubmissions(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Submissions retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

const reviewSubmission = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const decoded = req.user as JwtPayload;
  const result = await ProjectServices.reviewSubmission(Number(decoded.userId), Number(id), req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `Project ${req.body.status.toLowerCase()} successfully`,
    data: result,
  });
});

const getDashboardStats = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectServices.getDashboardStats();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Dashboard stats retrieved successfully",
    data: result,
  });
});

export const ProjectControllers = {
  submitProject,
  getMySubmissions,
  getAllSubmissions,
  reviewSubmission,
  getDashboardStats,
};