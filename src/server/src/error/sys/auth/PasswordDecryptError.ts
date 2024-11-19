import { BaseError } from "@/error/BaseError";

export class PasswordDecryptError extends BaseError {
  constructor() {
    super(200_003);
  }
}
