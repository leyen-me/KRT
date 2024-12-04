import { BaseError } from "@/error/BaseError";

export class DictCodeAlreadyExistsError extends BaseError {
  constructor() {
    super(200_006);
  }
}
