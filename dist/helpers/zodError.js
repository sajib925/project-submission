export const handlerZodError = (err) => {
    const errorSources = err.issues.map((issue) => ({
        path: issue.path[issue.path.length - 1],
        message: issue.message
    }));
    return {
        statusCode: 400,
        message: "Zod Validation Error",
        errorSources
    };
};
