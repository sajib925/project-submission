export declare const ProjectServices: {
    submitProject: (studentId: number, payload: any) => Promise<{
        feedback: string | null;
        id: number;
        description: string;
        status: import("@prisma/client").$Enums.SubmissionStatus;
        createdAt: Date;
        updatedAt: Date;
        projectName: string;
        repoUrl: string;
        liveLink: string | null;
        studentId: number;
        reviewerId: number | null;
    }>;
    getMySubmissions: (studentId: number) => Promise<{
        feedback: string | null;
        id: number;
        description: string;
        status: import("@prisma/client").$Enums.SubmissionStatus;
        createdAt: Date;
        updatedAt: Date;
        projectName: string;
        repoUrl: string;
        liveLink: string | null;
        studentId: number;
        reviewerId: number | null;
    }[]>;
    getAllSubmissions: (query: any) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
        };
        data: ({
            student: {
                name: string;
                id: number;
                email: string;
                github: string | null;
            };
        } & {
            feedback: string | null;
            id: number;
            description: string;
            status: import("@prisma/client").$Enums.SubmissionStatus;
            createdAt: Date;
            updatedAt: Date;
            projectName: string;
            repoUrl: string;
            liveLink: string | null;
            studentId: number;
            reviewerId: number | null;
        })[];
    }>;
    reviewSubmission: (reviewerId: number, submissionId: number, payload: {
        status: "APPROVED" | "REJECTED";
        feedback?: string;
    }) => Promise<{
        feedback: string | null;
        id: number;
        description: string;
        status: import("@prisma/client").$Enums.SubmissionStatus;
        createdAt: Date;
        updatedAt: Date;
        projectName: string;
        repoUrl: string;
        liveLink: string | null;
        studentId: number;
        reviewerId: number | null;
    }>;
    getDashboardStats: () => Promise<{
        totalSubmissions: number;
        totalPending: number;
        totalApproved: number;
        totalRejected: number;
    }>;
};
//# sourceMappingURL=project.service.d.ts.map