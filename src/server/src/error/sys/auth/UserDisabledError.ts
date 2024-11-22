import { BaseError } from "@/error/BaseError";

export class UserDisabledError extends BaseError {
  constructor() {
    super(200_004);
  }
}
