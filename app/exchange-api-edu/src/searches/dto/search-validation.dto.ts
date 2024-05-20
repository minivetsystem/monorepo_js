
export class SearchValidationDto {
  errors: string[];

  constructor(errors: string[]) {
    this.errors = errors;
  }
}
