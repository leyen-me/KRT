/// <reference types="vite/client" />

// middleware/result.ts
export interface Result<T> {
  code: number;
  data: T;
  message: string;
}

declare global {
  declare namespace Express {
    // middleware/result.ts
    export interface Response {
      success: (data: any, message?: string) => void;
      error: (code: number, message?: string, data?: any) => void;
      noFound: () => void;
    }
  }

  interface ImportMetaEnv {
    readonly VITE_PORT: number;
    readonly VITE_AUTH_SECURITY: string;
  }
}

export {};
