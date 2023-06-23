export interface IHTTPResponse<T = void> {
  success: boolean;
  errorMessage?: string;
  data?: T;
}