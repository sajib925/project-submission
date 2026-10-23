import type { TErrorSources, TGenericErrorResponse } from "../interfaces/error.type.js";

export const handlerZodError = (err: any): TGenericErrorResponse => {
    const errorSources: TErrorSources[] = err.issues.map((issue: any) => ({
        path: issue.path[issue.path.length - 1],
        message: issue.message
    }));

    return {
        statusCode: 400,
        message: "Zod Validation Error",
        errorSources
    };
};