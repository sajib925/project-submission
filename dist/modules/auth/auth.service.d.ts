export declare const safeUserSelect: {
    id: boolean;
    name: boolean;
    email: boolean;
    role: boolean;
    github: boolean;
    avatar: boolean;
    createdAt: boolean;
    updatedAt: boolean;
};
export declare const AuthServices: {
    register: (payload: {
        name: string;
        email: string;
        password: string;
        github?: string;
    }) => Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            name: string;
            id: number;
            role: import("@prisma/client").$Enums.Role;
            email: string;
            github: string | null;
            avatar: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    login: (payload: {
        email: string;
        password: string;
    }) => Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            name: string;
            id: number;
            role: import("@prisma/client").$Enums.Role;
            email: string;
            github: string | null;
            avatar: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    getNewAccessToken: (refreshToken: string) => Promise<{
        accessToken: string;
    }>;
    logout: (refreshToken?: string) => Promise<void>;
    getProfile: (userId: number) => Promise<{
        name: string;
        id: number;
        role: import("@prisma/client").$Enums.Role;
        email: string;
        github: string | null;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map