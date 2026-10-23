import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import type { TGenericErrorResponse } from "../interfaces/error.type.js";

export const handlePrismaValidationError = (
  err: PrismaClientKnownRequestError
): TGenericErrorResponse => {
  return {
    statusCode: 400,
    message: "Prisma Validation Error: Please check your input fields.",
  };
};