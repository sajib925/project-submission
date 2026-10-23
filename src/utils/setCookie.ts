import type { Response } from "express"

interface CookieTokens {
  accessToken?: string
  refreshToken?: string
}

export const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  path: "/",
} as const

export const setAuthCookies = (res: Response, tokens: CookieTokens) => {
  const { accessToken, refreshToken } = tokens

  if (accessToken) {
    res.cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 1 * 24 * 60 * 60 * 1000, 
    })
  }

  if (refreshToken) {
    res.cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 30 * 24 * 60 * 60 * 1000, 
    })
  }
}


export const clearAuthCookies = (res: Response) => {
  res.clearCookie("accessToken", cookieOptions)
  res.clearCookie("refreshToken", cookieOptions)
}