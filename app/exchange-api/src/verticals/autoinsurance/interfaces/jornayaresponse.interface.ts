/**
 * This interface represents the response from the 3rd party leadID service.
 */
export interface JornayaResponseRO extends Document {
  /**
   * This contains the error message from the leadID service.
   */
  error: { code: number; message: string };
  /**
   * This contains info related to validation from leadID service.
   */
  authenticate: {
    authentc: number;
    token: string;
  };
}
