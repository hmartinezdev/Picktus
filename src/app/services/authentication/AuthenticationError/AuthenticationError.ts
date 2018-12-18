export default class AuthenticationError extends Error {
  public formatedMessage: string;

  /**
   *
   * @param message - log message for debugging purpose
   * @param formatedMessage - formatted message for the user
   */
  constructor(message: string, formatedMessage: string = '') {
    super(message);
    this.formatedMessage = formatedMessage;
    Error.captureStackTrace(this, AuthenticationError);
  }
}
