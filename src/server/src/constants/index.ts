import path from "path";

export const IS_PRODUCTION = import.meta.env.MODE === "production";

export const CLIENT_SERVER_PATH = IS_PRODUCTION
  ? path.resolve(process.cwd(), "./dist/client")
  : path.resolve(process.cwd(), "../client");

export const AUTHORIZATION_KEY = "Authorization";
