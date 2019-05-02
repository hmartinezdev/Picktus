import AuthenticationError from '@services/authentication/AuthenticationError';
import { TypeKeys as UserType } from '../user/user-actions';
import { TypeKeys as DisplayType } from './display-actions';
import reducer from './display-reducer';

describe('display reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({ loader: false });
  });

  it('should return the initial state set in the parameters', () => {
    expect(reducer({}, {})).toEqual({});
  });

  it(`it should handle ${DisplayType.DISPLAY_LOADER}`, () => {
    expect(reducer(undefined, { type: DisplayType.DISPLAY_LOADER, show: true })).toEqual({ loader: true });
  });

  it(`it should handle ${UserType.USER_LOGIN_START}`, () => {
    expect(reducer(undefined, { type: UserType.USER_LOGIN_START })).toEqual({ loader: true });
  });

  it(`it should handle ${UserType.USER_SIGNOUT_START}`, () => {
    expect(reducer(undefined, { type: UserType.USER_SIGNOUT_START })).toEqual({ loader: true });
  });

  it(`it should handle ${UserType.USER_SIGNOUT_SUCCESS}`, () => {
    expect(reducer(undefined, { type: UserType.USER_SIGNOUT_SUCCESS })).toEqual({ loader: false });
  });

  it(`it should handle ${UserType.USER_SIGNOUT_FAILURE}`, () => {
    expect(
      reducer(undefined, { type: UserType.USER_SIGNOUT_FAILURE, error: new AuthenticationError('error') })
    ).toEqual({
      loader: false,
    });
  });

  it(`it should handle ${UserType.USER_LOGIN_SUCCESS}`, () => {
    expect(reducer(undefined, { type: UserType.USER_LOGIN_SUCCESS, user: {} })).toEqual({ loader: false });
  });

  it(`it should handle ${UserType.USER_LOGIN_FAILURE}`, () => {
    expect(reducer(undefined, { type: UserType.USER_LOGIN_FAILURE })).toEqual({ loader: false });
  });
});
