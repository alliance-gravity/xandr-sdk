export class XandrError extends Error {
  public error: string;

  public code: string;

  public status: number;

  public headers: Record<string, string>;

  public constructor (error: string, code: string, status: number, headers: Record<string, string>) {
    super(`${code}: ${error} (HTTP ${status})`);
    this.error = error;
    this.code = code;
    this.status = status;
    this.headers = headers;
  }
}