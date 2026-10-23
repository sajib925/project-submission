import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import type { TGenericErrorResponse } from "../interfaces/error.type.js";

export const handlePrismaNotFoundError = (
  err: PrismaClientKnownRequestError
): TGenericErrorResponse => {
  return {
    statusCode: 404,
    message: (err.meta?.cause as string) || "Record not found!",
  };
};