export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}
export declare const createUserTokens: (user: {
    userId: number;
    email: string;
    role?: string;
}) => AuthTokens;
//# sourceMappingURL=userTokens.d.ts.map