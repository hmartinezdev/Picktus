export default class AuthenticationError extends Error {
  constructor(...args: any[]) {
    super(...args);
    Error.captureStackTrace(this, AuthenticationError);
  }
}
