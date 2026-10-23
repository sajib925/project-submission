const isProduction = process.env.NODE_ENV === "production";
export const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: (isProduction ? "none" : "lax"),
    path: "/",
};
export const setAuthCookies = (res, tokens) => {
    const { accessToken, refreshToken } = tokens;
    if (accessToken) {
        res.cookie("accessToken", accessToken, {
            ...cookieOptions,
            maxAge: 1 * 24 * 60 * 60 * 1000,
        });
    }
    if (refreshToken) {
        res.cookie("refreshToken", refreshToken, {
            ...cookieOptions,
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
    }
};
export const clearAuthCookies = (res) => {
    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);
};
