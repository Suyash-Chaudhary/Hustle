import { ZodError } from "zod";
import { ApiError } from "../errors/api-error";

type RequestValidationErrorType = "body" | "params";
export class RequestValidationError extends ApiError {
  message: string;
  code: number = 400;
  errorData: ZodError;
  kind: RequestValidationErrorType;

  constructor(kind: RequestValidationErrorType, errorData: ZodError) {
    super(`Invalid request ${kind}.`);
    this.message = `Invalid request ${kind}.`;
    this.kind = kind;
    this.errorData = errorData;
  }

  serialize = () => {
    return (this.errorData.errors || []).map((error) => {
      return { message: error.message, fields: error.path.join(",") };
    });
  };
}
