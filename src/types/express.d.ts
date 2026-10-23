

declare global {
  namespace Express {
    interface Request {
      user?: IJwtPayload
    }
  }
}


export interface IJwtPayload {
  userId: number
  email: string
  role?: "ADMIN" | "MENTOR" | "STUDENT"
}
