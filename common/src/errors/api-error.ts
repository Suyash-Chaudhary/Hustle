type ErrorResponse = { message: string; field?: string }[];
export abstract class ApiError extends Error {
  abstract message: string;
  abstract code: number;
  abstract serialize: () => ErrorResponse;

  constructor(message: string) {
    super(message);
  }
}
