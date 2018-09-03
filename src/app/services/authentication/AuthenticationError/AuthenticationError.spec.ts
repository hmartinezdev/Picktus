import AuthenticationError from './';

describe('AuthenticationError', () => {
  test('it should instantiate a new AuthenticationError', () => {
    const error = new AuthenticationError('error');
    expect(error instanceof Error).toBe(true);
  });
});
