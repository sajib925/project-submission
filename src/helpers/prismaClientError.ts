import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import type { TGenericErrorResponse } from "../interfaces/error.type.js";

export const handlePrismaDuplicateError = (
  err: PrismaClientKnownRequestError
): TGenericErrorResponse => {
  const target = (err.meta?.target as string[]) || ["Field"];
  
  return {
    statusCode: 400,
    message: `${target.join(", ")} already exists!`,
  };
};