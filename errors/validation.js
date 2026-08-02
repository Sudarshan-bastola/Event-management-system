export class ValidationError extends Error {
  constructor(message = "Validation error", errors = []) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 400;
    this.errors = errors.map((error) => ({
      field: error.path,
      message: error.msg,
    }));
  }
}
