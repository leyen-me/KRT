import { BaseError } from "@/error/BaseError";

export class UserNotFound extends BaseError {
  constructor() {
    super(30001);
  }
}
