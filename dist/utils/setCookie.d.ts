import type { Response } from "express";
interface CookieTokens {
    accessToken?: string;
    refreshToken?: string;
}
export declare const cookieOptions: {
    httpOnly: boolean;
    secure: boolean;
    sameSite: "none" | "lax";
    path: string;
};
export declare const setAuthCookies: (res: Response, tokens: CookieTokens) => void;
export declare const clearAuthCookies: (res: Response) => void;
export {};
//# sourceMappingURL=setCookie.d.ts.map