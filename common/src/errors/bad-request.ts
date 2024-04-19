import { ApiError } from "./api-error";

export class BadRequestError extends ApiError {
  message: string;
  code: number = 400;

  constructor(message: string) {
    super(message);
    this.message = message;
  }

  serialize = () => {
    return [{ message: this.message }];
  };
}
