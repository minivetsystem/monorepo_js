/**
 * This interface represents the response from the 3rd party Blacklist Aliance TCPA Litigator Phone validation service.
 */
export interface BlacklistAlianceTCPALitigatorPhoneRO extends Document {
  /**
   * represents the response data from the litigator service.
   */
  clean: any;

  /**
   * represents the actual result from the litigator service.
   */
  results: any;
}
