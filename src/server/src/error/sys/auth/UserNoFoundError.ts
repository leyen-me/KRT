import { BaseError } from "@/error/BaseError";

export class UserNoFoundError extends BaseError {
  constructor() {
    super(200_001);
  }
}
