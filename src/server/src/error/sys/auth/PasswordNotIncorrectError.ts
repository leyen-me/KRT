import { BaseError } from "@/error/BaseError";

export class PasswordNotIncorrectError extends BaseError {
  constructor() {
    super(200_002);
  }
}
