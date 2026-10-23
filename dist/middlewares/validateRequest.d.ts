import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";
export declare const validateRequest: (schema: ZodType<any, any, any>) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=validateRequest.d.ts.map