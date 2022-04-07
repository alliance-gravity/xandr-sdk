export class XandrError extends Error {
  public error: string;
  public errorId: string;
  constructor(errorId: string, error: string) {
    super(`${errorId}: ${error}`);
    this.errorId = errorId;
    this.error = error;
  }
}