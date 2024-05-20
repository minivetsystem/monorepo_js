/**
/* This close represents the validation dto which contains validation errors or the other entities
 *  required for processing the bid.
 */
export class BidValidationDto {
  /**
   * This contains all the validation errors for the bid.
   */
  readonly errors: string[];

  /**
   * Constructor to initialise the bid validation dto.
   */
  constructor(errors: string[]) {
    this.errors = errors;
  }
}
