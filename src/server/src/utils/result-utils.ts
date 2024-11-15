/**
 * Unified response format utility class
 */
export class Result {
  /**
   * Standard response structure
   * @param code - Response status code
   * @param data - Response data
   * @param message - Response message
   */
  private static json(code: number, data: any, message: string) {
    return {
      code,
      data,
      message,
    };
  }

  /**
   * Success response
   * @param data - Response data
   * @param message - Success message (optional)
   * @returns Success response object
   */
  public static success(data: any = null, message: string = "Success") {
    return this.json(200, data, message);
  }

  /**
   * Error response
   * @param message - Error message
   * @param code - Error status code (default: 500)
   * @returns Error response object
   */
  public static error(message: string = "Server Error", code: number = 500) {
    return this.json(code, null, message);
  }

  /**
   * Custom response
   * @param code - Response status code
   * @param data - Response data
   * @param message - Response message
   * @returns Custom response object
   */
  public static custom(code: number, data: any = null, message: string = "") {
    return this.json(code, data, message);
  }
}
