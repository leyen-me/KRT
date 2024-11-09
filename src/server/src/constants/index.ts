import path from "path";

export const RESPONSE_SUCCESS_CODE  = 200;
export const RESPONSE_NO_FOUND_CODE = 404;

export const IS_PRODUCTION = process.env.NODE_ENV === "production";

export const CLIENT_SERVER_PATH = IS_PRODUCTION
  ? path.resolve(process.cwd(), "./dist/client")
  : path.resolve(process.cwd(), "../client");  