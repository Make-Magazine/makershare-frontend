export enum NetworkErrorCode {
  INVALID_PASSWORD = <any>'invalid_password',
}

export interface AuthError extends Error {
  response: Response;
}

export interface NetworkError {
  code: string | NetworkErrorCode;
  description: string;
  message?: string;
  original: AuthError;
  statusCode: number;
  policy?: string;
}
