import { generateToken, type UserTokenPayload } from "./jwt.js"

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export const createUserTokens = (user: {
  userId: number
  email: string
  role?: string
}): AuthTokens => {
  const {
    JWT_ACCESS_SECRET,
    JWT_ACCESS_EXPIRES,
    JWT_REFRESH_SECRET,
    JWT_REFRESH_EXPIRES,
  } = process.env

  if (
    !JWT_ACCESS_SECRET ||
    !JWT_ACCESS_EXPIRES ||
    !JWT_REFRESH_SECRET ||
    !JWT_REFRESH_EXPIRES
  ) {
    throw new Error("JWT environment variables are missing in process.env")
  }

  const jwtPayload: UserTokenPayload = {
    userId: user.userId,
    email: user.email,
    role: user.role,
  }

  const accessToken = generateToken(
    jwtPayload,
    JWT_ACCESS_SECRET,
    JWT_ACCESS_EXPIRES
  )

  const refreshToken = generateToken(
    jwtPayload,
    JWT_REFRESH_SECRET,
    JWT_REFRESH_EXPIRES
  )

  return {
    accessToken,
    refreshToken,
  }
}