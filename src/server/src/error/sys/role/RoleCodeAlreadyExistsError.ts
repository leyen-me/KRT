import { BaseError } from "@/error/BaseError";

export class RoleCodeAlreadyExistsError extends BaseError {
  constructor() {
    super(200_008);
  }
}
