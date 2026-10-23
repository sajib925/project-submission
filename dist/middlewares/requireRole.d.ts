import type { NextFunction, Request, Response } from "express";
export declare const requireRole: (...allowedRoles: Array<"STUDENT" | "MENTOR" | "ADMIN">) => (req: Request, _res: Response, next: NextFunction) => void;
//# sourceMappingURL=requireRole.d.ts.map