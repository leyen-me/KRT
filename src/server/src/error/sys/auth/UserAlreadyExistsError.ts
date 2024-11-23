
import { BaseError } from "@/error/BaseError";

export class UserAlreadyExistsError extends BaseError {
  constructor() {
    super(200_005);
  }
}
