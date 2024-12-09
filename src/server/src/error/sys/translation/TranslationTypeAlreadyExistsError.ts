import { BaseError } from "@/error/BaseError";

export class TranslationTypeAlreadyExistsError extends BaseError {
  constructor() {
    super(200_009);
  }
}
