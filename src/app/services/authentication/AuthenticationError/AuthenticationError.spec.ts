import AuthenticationError from './';

describe('AuthenticationError', () => {
  test('it should instantiate a new AuthenticationError', () => {
    const error = new AuthenticationError('error');
    expect(error instanceof Error).toBe(true);
    expect(error.formatedMessage).toEqual('');
  });

  test('it should add a formated message if added in parameters', () => {
    const message = 'formatedMessage';
    const error = new AuthenticationError('error', message);
    expect(error instanceof Error).toBe(true);
    expect(error.formatedMessage).toEqual('formatedMessage');
  });
});
