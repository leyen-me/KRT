/// <reference types="vite/client" />

// middleware/result.ts
export interface Result<T> {
  code: number;
  data: T;
  message: string;
}

declare module "koa" {
  export interface Context {
    /**
     * Send success response
     * @param data - Response data
     * @param message - Success message
     */
    success(data?: any, message?: string): void;

    /**
     * Send error response
     * @param message - Error message
     * @param code - Error status code
     */
    error(message?: string, code?: number): void;

    /**
     * Send custom response
     * @param code - Response status code
     * @param data - Response data
     * @param message - Response message
     */
    send(code: number, data?: any, message?: string): void;
  }
}

declare global {
  interface ImportMetaEnv {
    readonly VITE_PORT: number;
    readonly VITE_AUTH_SECURITY: string;
  }
}

export {};
