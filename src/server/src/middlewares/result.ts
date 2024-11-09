import { Express, Response } from "express";

import { RESPONSE_NO_FOUND_CODE, RESPONSE_SUCCESS_CODE } from "../constants";
import { ERROR_CODE } from "../constants/error-code";

const successResponse = (res: Response, data: any, message?: string) => {
  res.status(RESPONSE_SUCCESS_CODE).json({
    code: RESPONSE_SUCCESS_CODE,
    message: message ? message : "Success",
    data: data,
  });
};

const errorResponse = (
  res: Response,
  code: number,
  message?: string,
  data?: any
) => {
  res.status(RESPONSE_SUCCESS_CODE).json({
    code: code,
    message: message ? message : ERROR_CODE[code],
    data: data ? data : null,
  });
};

const noFoundResponse = (res: Response, code: number) => {
  res.status(code).json({
    code: code,
    message: ERROR_CODE[code],
    data: null,
  });
};

export function result(app: Express) {
  return (req, res, next) => {
    res.success = (data: any, message?: string) =>
      successResponse(res, data, message);
    res.error = (code: number, message?: string, data?: any) =>
      errorResponse(res, code, message, data);
    res.noFound = () => noFoundResponse(res, RESPONSE_NO_FOUND_CODE);

    next();
  };
}
