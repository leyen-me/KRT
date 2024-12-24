export const ERROR_CODES = {
  200: "server.error.code.success",
  401: "server.error.code.unauthorized",
  404: "server.error.code.not_found",
  500: "server.error.code.internal_error",
  501: "server.error.code.validate_error",

  // foreign key constraint failed
  200_2003: "server.error.code.foreign_key_constraint_failed",

  // sys auth
  200_001: "server.error.code.sys.auth.user_not_found",
  200_002: "server.error.code.sys.auth.password_not_incorrect",
  200_003: "server.error.code.sys.auth.password_decrypt",
  200_004: "server.error.code.sys.auth.user_disabled",
  200_005: "server.error.code.sys.auth.user_already_exists",

  // sys dict
  200_006: "server.error.code.sys.dict.dict_code_already_exists",
  200_007: "server.error.code.sys.dict.item.dict_item_value_already_exists",

  // sys role
  200_008: "server.error.code.sys.role.role_code_already_exists",

  // sys translation
  200_009: "server.error.code.sys.translation.translation_type_already_exists",
};
