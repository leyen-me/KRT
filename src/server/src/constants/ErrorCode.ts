export const ERROR_CODES = {
  200: "server.error.code.success",
  404: "server.error.code.not_found",
  500: "server.error.code.internal_error",
  501: "server.error.code.validate_error",

  // sys auth
  200_001: "server.error.code.sys.auth.user_not_found",
  200_002: "server.error.code.sys.auth.password_not_incorrect",
  200_003: "server.error.code.sys.auth.password_decrypt",
  200_004: "server.error.code.sys.auth.user_disabled",
  200_005: "server.error.code.sys.auth.user_already_exists",
};
