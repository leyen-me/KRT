import { BaseError } from "@/error/BaseError";

export class UserAuthenticationError extends BaseError {
  constructor() {
    super(401);
  }
}
