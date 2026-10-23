import httpStatus from "http-status-codes";
import { db } from "../../config/db.js";
import AppError from "../../errorHelper/appError.js";

// ==========================================
// 1. STUDENT SERVICES
// ==========================================
const submitProject = async (studentId: number, payload: any) => {
  const existingName = await db.projectSubmission.findFirst({
    where: { studentId, projectName: payload.projectName },
  });
  if (existingName) {
    throw new AppError(httpStatus.CONFLICT, "You have already submitted a project with this name");
  }

  const existingRepo = await db.projectSubmission.findFirst({
    where: { repoUrl: payload.repoUrl },
  });
  if (existingRepo) {
    throw new AppError(httpStatus.CONFLICT, "This repository URL has already been submitted");
  }

  return db.projectSubmission.create({
    data: {
      ...payload,
      studentId,
    },
  });
};

const getMySubmissions = async (studentId: number) => {
  return db.projectSubmission.findMany({
    where: { studentId },
    orderBy: { createdAt: "desc" },
  });
};

// ==========================================
// 2. MENTOR / ADMIN SERVICES
// ==========================================
const getAllSubmissions = async (query: any) => {
  const { page = 1, limit = 10, status } = query;
  
  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const skip = (pageNumber - 1) * limitNumber;

  const whereCondition: any = {};
  if (status && status !== "ALL") {
    whereCondition.status = status;
  }

  const submissions = await db.projectSubmission.findMany({
    where: whereCondition,
    skip,
    take: limitNumber,
    orderBy: { createdAt: "desc" },
    include: {
      student: {
        select: { id: true, name: true, email: true, github: true },
      },
    },
  });

  const total = await db.projectSubmission.count({ where: whereCondition });

  return {
    meta: { page: pageNumber, limit: limitNumber, total, totalPage: Math.ceil(total / limitNumber) },
    data: submissions,
  };
};

const reviewSubmission = async (reviewerId: number, submissionId: number, payload: { status: "APPROVED" | "REJECTED", feedback?: string }) => {
  const submission = await db.projectSubmission.findUnique({ where: { id: submissionId } });
  
  if (!submission) {
    throw new AppError(httpStatus.NOT_FOUND, "Project submission not found");
  }

  return db.projectSubmission.update({
    where: { id: submissionId },
    data: {
      status: payload.status,
      feedback: payload.feedback,
      reviewerId,
    },
  });
};

const getDashboardStats = async () => {
  const [totalSubmissions, totalPending, totalApproved, totalRejected] = await Promise.all([
    db.projectSubmission.count(),
    db.projectSubmission.count({ where: { status: "PENDING" } }),
    db.projectSubmission.count({ where: { status: "APPROVED" } }),
    db.projectSubmission.count({ where: { status: "REJECTED" } }),
  ]);

  return { totalSubmissions, totalPending, totalApproved, totalRejected };
};

export const ProjectServices = {
  submitProject,
  getMySubmissions,
  getAllSubmissions,
  reviewSubmission,
  getDashboardStats,
};