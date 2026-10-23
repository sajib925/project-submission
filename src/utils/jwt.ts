import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken"

// Payload type definition
export interface UserTokenPayload extends JwtPayload {
  userId: number
  email: string
  role?: string
}

// Generate a single JWT
export const generateToken = (
  payload: { userId: number; email: string; role?: string },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(payload, secret, { expiresIn } as SignOptions)
}

// Verify JWT and sanitize payload
export const verifyToken = (
  token: string,
  secret: string
): UserTokenPayload => {
  const verifiedToken = jwt.verify(token, secret) as JwtPayload & {
    userId: string | number
    email: string
    role?: string
  }

  return {
    ...verifiedToken,
    userId: Number(verifiedToken.userId), // Ensure userId is always a number
    email: verifiedToken.email,
    role: verifiedToken.role,
  }
}