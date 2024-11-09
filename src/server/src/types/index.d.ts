// Extend the type of process.env

// middleware/result.ts
interface Result<T> {
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

  // .env
  declare namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      PORT: string;
    }
  }
}

export {};
