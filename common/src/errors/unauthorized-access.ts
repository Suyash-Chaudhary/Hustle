import { ApiError } from "./api-error";

export class UnauthorizedAccessError extends ApiError {
  message: string = "Not authorized.";
  code: number = 401;

  constructor() {
    super("Not authorized.");
  }

  serialize = () => {
    return [{ message: this.message }];
  };
}
