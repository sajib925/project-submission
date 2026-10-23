import { z } from "zod";

const submitProject = z.object({
  body: z.object({
    projectName: z.string().min(3, "Project name must be at least 3 characters long"),
    repoUrl: z.string().url("Invalid GitHub Repository URL"),
    liveLink: z.string().url("Invalid Live Link URL").optional().or(z.literal("")),
    description: z.string().min(10, "Description must be at least 10 characters long"),
  }),
});

const reviewProject = z.object({
  body: z.object({
    status: z.enum(["APPROVED", "REJECTED"], {
      message: "Status must be either APPROVED or REJECTED",
    }),
    feedback: z.string().optional(),
  }),
});

export const ProjectValidations = {
  submitProject,
  reviewProject,
};