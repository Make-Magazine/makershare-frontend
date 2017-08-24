export interface NetworkError {
  code: string;
  description: string;
  original: Error;
  statusCode: number;
}