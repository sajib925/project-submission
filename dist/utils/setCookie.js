export const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
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
