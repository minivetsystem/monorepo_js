/**
 * This serves as the payload for the jwt
 */
export interface JwtPayloadInterface {
    /**
     * email of the user.
     */
    email: string;
    /**
     * iat value
     */
    iat?: number;
    /**
     * exp value
     */
    exp?: number;
  }
  