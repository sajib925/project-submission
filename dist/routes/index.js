import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.route.js";
import { projectRoutes } from "../modules/project/project.routes.js";
export const apiRoutes = Router();
const moduleRoutes = [
    { path: "/auth", route: authRoutes },
    { path: "/projects", route: projectRoutes },
];
moduleRoutes.forEach((route) => {
    apiRoutes.use(route.path, route.route);
});
export default apiRoutes;
