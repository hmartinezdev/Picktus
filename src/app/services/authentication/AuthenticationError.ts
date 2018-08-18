export default class AuthenticationError extends Error {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, AuthenticationError);
  }
}
