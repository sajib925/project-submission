import jwt, {} from "jsonwebtoken";
// Generate a single JWT
export const generateToken = (payload, secret, expiresIn) => {
    return jwt.sign(payload, secret, { expiresIn });
};
// Verify JWT and sanitize payload
export const verifyToken = (token, secret) => {
    const verifiedToken = jwt.verify(token, secret);
    return {
        ...verifiedToken,
        userId: Number(verifiedToken.userId),
        email: verifiedToken.email,
        role: verifiedToken.role,
    };
};
