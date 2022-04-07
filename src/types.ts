export interface RequestParameters {
  method: string;
  endpoint: string;
  query?: Record<string, number | string>;
  headers?: Record<string, string>;
  body?: unknown;
}

export interface XandrResponse<T> {
  response: T;
}

export interface XandrGeneralError {
  error_id: string;
  error: string;
}

export interface AuthParameters {
  username: string;
  password: string;
}

export interface AuthResponse {
  status: string;
  token: string;
}