import { z } from "zod";
export declare const ProjectValidations: {
    submitProject: z.ZodObject<{
        body: z.ZodObject<{
            projectName: z.ZodString;
            repoUrl: z.ZodString;
            liveLink: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
            description: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>;
    reviewProject: z.ZodObject<{
        body: z.ZodObject<{
            status: z.ZodEnum<{
                APPROVED: "APPROVED";
                REJECTED: "REJECTED";
            }>;
            feedback: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
    }, z.core.$strip>;
};
//# sourceMappingURL=project.validation.d.ts.map