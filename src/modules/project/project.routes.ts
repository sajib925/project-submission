import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { requireRole } from "../../middlewares/requireRole.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { submissionRateLimiter } from "../../middlewares/rateLimiter.js";
import { ProjectControllers } from "./project.controller.js";
import { ProjectValidations } from "./project.validation.js";

const router: Router = Router();

// 1. STUDENT ROUTES
router.post( "/submit", checkAuth(), requireRole("STUDENT"), submissionRateLimiter, validateRequest(ProjectValidations.submitProject), ProjectControllers.submitProject);

router.get( "/my-submissions", checkAuth(), requireRole("STUDENT"), ProjectControllers.getMySubmissions);

// 2. MENTOR / ADMIN ROUTES
router.get( "/stats", checkAuth(), requireRole("MENTOR", "ADMIN"), ProjectControllers.getDashboardStats);

router.get( "/", checkAuth(), requireRole("MENTOR", "ADMIN"), ProjectControllers.getAllSubmissions);

router.patch( "/:id/review", checkAuth(), requireRole("MENTOR", "ADMIN"), validateRequest(ProjectValidations.reviewProject), ProjectControllers.reviewSubmission);

export const projectRoutes = router;
export default router;