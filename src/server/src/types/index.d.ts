/// <reference types="vite/client" />
/// <reference types="@app/i18n" />
/// <reference types="@app/result" />

declare global {
  interface ImportMetaEnv {
    readonly VITE_PORT: number;
    readonly VITE_AUTH_SECURITY: string;
  }
}