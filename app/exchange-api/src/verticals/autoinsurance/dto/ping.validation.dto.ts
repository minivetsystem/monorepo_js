import { User } from '../../../users/schemas';
import { LeadType } from '../schemas';

/**
/* This class represents the validation dto which contains validation errors or the other entities
 *  required for processing the ping request.
 */
export class PingValidationDto {
  /**
   * This will contain all the validation errors.
   */
  errors: string[];
  /**
   * This will contain the vendor for the ping request which is fetched during validation.
   */
  vendor: User;
  /**
   * This will contain the lead type for the ping request which is fetched during validation.
   */
  lead_type: LeadType;

  /**
   * Constructor for the ping validation initialisation
   */
  constructor(errors: string[]) {
    this.errors = errors;
  }
}
