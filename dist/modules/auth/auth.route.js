import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { AuthControllers } from "./auth.controller.js";
const router = Router();
router.post("/register", AuthControllers.register);
router.post("/login", AuthControllers.login);
router.post("/refresh-token", AuthControllers.refreshToken);
router.post("/logout", AuthControllers.logout);
//  Protected User Profile routes
router.get("/profile", checkAuth(), AuthControllers.getProfile);
export const authRoutes = router;
export default router;
