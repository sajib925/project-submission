import bcrypt from "bcrypt";
import httpStatus from "http-status-codes";
import type { JwtPayload } from "jsonwebtoken";
import { db } from "../../config/db.js";
import AppError from "../../errorHelper/appError.js";
import { verifyToken } from "../../utils/jwt.js";
import { createUserTokens } from "../../utils/userTokens.js";

// শুধুমাত্র ড্যাশবোর্ডের জন্য প্রয়োজনীয় ডেটা সিলেক্ট করা হবে
export const safeUserSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  github: true,
  avatar: true,
  createdAt: true,
  updatedAt: true,
};

// Helpers
const generateRefreshTokenRecord = async (userId: number, refreshToken: string) => {
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
  await db.refreshToken.create({
    data: { userId, token: refreshToken, expiresAt },
  });
};

const buildTokenResponse = async (user: { id: number; email: string; role: string }) => {
  const tokens = createUserTokens({ userId: user.id, email: user.email, role: user.role });
  await generateRefreshTokenRecord(user.id, tokens.refreshToken);
  return tokens;
};

// Auth Services
const register = async (payload: { name: string; email: string; password: string; github?: string }) => {
  const existingUser = await db.user.findUnique({ where: { email: payload.email.toLowerCase() } });
  if (existingUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email already exists");
  }

  const hashedPassword = await bcrypt.hash(payload.password, Number(process.env.BCRYPT_SALT_ROUND || 10));

  const user = await db.user.create({
    data: {
      name: payload.name,
      email: payload.email.toLowerCase(),
      password: hashedPassword,
      github: payload.github,
      role: "STUDENT", // SECURITY TRICK: Force role to be STUDENT
    },
    select: safeUserSelect,
  });

  const tokens = await buildTokenResponse(user);
  return { user, ...tokens };
};

const login = async (payload: { email: string; password: string }) => {
  const user = await db.user.findUnique({ where: { email: payload.email.toLowerCase() } });
  
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid credentials");
  }

  const isPasswordMatched = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid credentials");
  }

  const tokens = await buildTokenResponse(user);
  const { password, ...safeUser } = user; // Exclude password from response

  return { user: safeUser, ...tokens };
};

const getNewAccessToken = async (refreshToken: string) => {
  if (!refreshToken) throw new AppError(httpStatus.UNAUTHORIZED, "No refresh token provided");

  const stored = await db.refreshToken.findUnique({ where: { token: refreshToken } });
  
  // Check if token exists and is not expired
  if (!stored || stored.expiresAt < new Date()) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Refresh token is invalid or expired");
  }

  const decoded = verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET as string) as JwtPayload;
  const user = await db.user.findUnique({ where: { id: Number(decoded.userId) } });

  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User account no longer exists");
  }

  const tokens = createUserTokens({ userId: user.id, email: user.email, role: user.role });
  return { accessToken: tokens.accessToken };
};

const logout = async (refreshToken?: string) => {
  if (refreshToken) {
    // SECURITY TRICK: Completely remove the token from database on logout
    await db.refreshToken.deleteMany({
      where: { token: refreshToken },
    });
  }
};

const getProfile = async (userId: number) => {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: safeUserSelect,
  });
  if (!user) throw new AppError(httpStatus.NOT_FOUND, "User not found");
  return user;
};

export const AuthServices = {
  register,
  login,
  getNewAccessToken,
  logout,
  getProfile,
};