import { Router } from "express"
import { authRoutes } from "../modules/auth/auth.route.js"


export const apiRoutes: Router = Router()

const moduleRoutes = [
  { path: "/auth", route: authRoutes },
]

moduleRoutes.forEach((route) => {
  apiRoutes.use(route.path, route.route)
})

export default apiRoutes
