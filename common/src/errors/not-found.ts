import { ApiError } from "../errors/api-error";

export class NotFoundError extends ApiError {
  message: string = "Not found.";
  code: number = 404;

  constructor() {
    super("Not found");
  }

  serialize = () => {
    return [{ message: "Not found." }];
  };
}
