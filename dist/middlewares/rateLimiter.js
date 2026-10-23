import rateLimit from "express-rate-limit";
export const submissionRateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5,
    message: {
        success: false,
        message: "Too many submission attempts from this IP, please try again after an hour.",
    },
    standardHeaders: true,
    legacyHeaders: false,
});
