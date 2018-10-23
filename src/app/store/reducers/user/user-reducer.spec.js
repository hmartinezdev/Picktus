import { TypeKeys } from './user-actions';
import reducer from './user-reducer';

describe('todos reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({ authenticated: false });
  });

  it('should return the initial state set in the parameters', () => {
    expect(reducer({}, {})).toEqual({});
  });

  it(`it should handle ${TypeKeys.USER_LOGIN_SUCCESS}`, () => {
    expect(reducer(undefined, { type: TypeKeys.USER_LOGIN_SUCCESS })).toEqual({ authenticated: true });
  });

  it(`it should handle ${TypeKeys.USER_LOGIN_SUCCESS}`, () => {
    expect(reducer(undefined, { type: TypeKeys.USER_LOGIN_FAILED })).toEqual({ authenticated: false });
  });

  it(`it should handle ${TypeKeys.USER_CREATION_START}`, () => {
    expect(reducer(undefined, { type: TypeKeys.USER_CREATION_START })).toEqual({
      authenticated: false,
      creationInProgress: true,
    });
  });

  it(`it should handle ${TypeKeys.USER_CREATION_SUCCESS}`, () => {
    expect(reducer(undefined, { type: TypeKeys.USER_CREATION_SUCCESS })).toEqual({
      authenticated: false,
      creationInProgress: false,
    });
  });

  it(`it should handle ${TypeKeys.USER_CREATION_FAILURE}`, () => {
    expect(reducer(undefined, { type: TypeKeys.USER_CREATION_FAILURE })).toEqual({
      authenticated: false,
      creationInProgress: false,
    });
  });
});
