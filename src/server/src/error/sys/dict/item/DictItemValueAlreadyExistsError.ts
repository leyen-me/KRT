import { BaseError } from "@/error/BaseError";

export class DictItemValueAlreadyExistsError extends BaseError {
  constructor() {
    super(200_007);
  }
}
