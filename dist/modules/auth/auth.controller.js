import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { clearAuthCookies, setAuthCookies } from "../../utils/setCookie.js";
import { AuthServices } from "./auth.service.js";
const register = catchAsync(async (req, res) => {
    const result = await AuthServices.register(req.body);
    setAuthCookies(res, {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
    });
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Student registered successfully",
        data: result,
    });
});
const login = catchAsync(async (req, res) => {
    const result = await AuthServices.login(req.body);
    setAuthCookies(res, {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
    });
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Logged in successfully",
        data: result,
    });
});
const refreshToken = catchAsync(async (req, res) => {
    const token = req.cookies?.refreshToken || req.body?.refreshToken;
    const result = await AuthServices.getNewAccessToken(token);
    setAuthCookies(res, {
        accessToken: result.accessToken,
    });
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "New access token generated",
        data: { token: result.accessToken },
    });
});
const logout = catchAsync(async (req, res) => {
    const token = req.cookies?.refreshToken || req.body?.refreshToken;
    await AuthServices.logout(token);
    clearAuthCookies(res);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Logged out successfully",
        data: null,
    });
});
const getProfile = catchAsync(async (req, res) => {
    const decoded = req.user;
    const result = await AuthServices.getProfile(Number(decoded.userId));
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Profile retrieved successfully",
        data: result,
    });
});
export const AuthControllers = {
    register,
    login,
    refreshToken,
    logout,
    getProfile,
};
