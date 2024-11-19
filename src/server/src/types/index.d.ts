/// <reference types="vite/client" />
/// <reference types="@app/result" />
/// <reference types="@app/i18n" />

declare global {
  interface ImportMetaEnv {
    readonly VITE_PORT: number;
    readonly VITE_AUTH_SECURITY: string;
  }
}
