/**
 * This interface represents the response from the 3rd party Blacklist Aliance Phone validation service.
 */
export interface BlacklistAliancePhoneRO extends Document {
  /**
   * represents UUID v4
   */
  sid: string;

  /**
   * repreents status string
   */
  status: string;
}
