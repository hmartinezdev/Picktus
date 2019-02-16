import Authentication, { ISigninOptions, SigninMethods } from '@services/authentication';
import AuthenticationError from '@services/authentication/AuthenticationError';
import firebase from 'firebase';
import Router from 'next/router';
import { ThunkAction } from 'redux-thunk';
import { IUserState } from './user.type';

export type ThunkResult<R> = ThunkAction<R, IUserState, undefined, UserActions>;

export enum TypeKeys {
  USER_SERVER_AUTH = 'USER_SERVER_AUTH',
  USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS',
  USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE',
  USER_LOGIN_START = 'USER_LOGIN_START',
  USER_CREATION_START = 'USER_CREATION_START',
  USER_CREATION_SUCCESS = 'USER_CREATION_SUCCESS',
  USER_CREATION_FAILURE = 'USER_CREATION_FAILURE',
  USER_SIGNOUT_START = 'USER_SIGNOUT_START',
  USER_SIGNOUT_SUCCESS = 'USER_SIGNOUT_SUCCESS',
  USER_SIGNOUT_FAILURE = 'USER_SIGNOUT_FAILURE',
  USER_LOGOUT = 'USER_LOGOUT',
}

export interface UserServerAuth {
  type: TypeKeys.USER_SERVER_AUTH;
  user: firebase.User | undefined;
}

export const userServerAuth = (user: firebase.User | undefined): UserServerAuth => ({
  type: TypeKeys.USER_SERVER_AUTH,
  user,
});

export interface UserLoginStart {
  type: TypeKeys.USER_LOGIN_START;
}

export const userLoginStart = (): UserLoginStart => ({
  type: TypeKeys.USER_LOGIN_START,
});

export interface UserLoginSuccess {
  type: TypeKeys.USER_LOGIN_SUCCESS;
  user: firebase.User;
}

export const userLoginSuccess = (user: firebase.User): UserLoginSuccess => ({
  type: TypeKeys.USER_LOGIN_SUCCESS,
  user,
});

export interface UserLoginFailed {
  type: TypeKeys.USER_LOGIN_FAILURE;
  error: AuthenticationError;
}

export const userLoginFailure = (error: AuthenticationError): UserLoginFailed => ({
  error,
  type: TypeKeys.USER_LOGIN_FAILURE,
});

export interface UserLogout {
  type: TypeKeys.USER_LOGOUT;
}

export const userLogout = (): UserLogout => ({
  type: TypeKeys.USER_LOGOUT,
});

export interface UserCreationStart {
  type: TypeKeys.USER_CREATION_START;
}

export const userCreationStart = (): UserCreationStart => ({
  type: TypeKeys.USER_CREATION_START,
});

export interface UserCreationSuccess {
  type: TypeKeys.USER_CREATION_SUCCESS;
}

export const userCreationSuccess = (): UserCreationSuccess => ({
  type: TypeKeys.USER_CREATION_SUCCESS,
});

export interface UserCreationFailure {
  type: TypeKeys.USER_CREATION_FAILURE;
  error: AuthenticationError;
}

export const userCreationFailure = (error: AuthenticationError): UserCreationFailure => ({
  error,
  type: TypeKeys.USER_CREATION_FAILURE,
});

export const userSignOutStart = (): UserSignOutStart => ({
  type: TypeKeys.USER_SIGNOUT_START,
});

export interface UserSignOutStart {
  type: TypeKeys.USER_SIGNOUT_START;
}

export const userSignOutSuccess = (): UserSignOutSuccess => ({
  type: TypeKeys.USER_SIGNOUT_SUCCESS,
});

export interface UserSignOutSuccess {
  type: TypeKeys.USER_SIGNOUT_SUCCESS;
}

export const userSignOutFailure = (error: AuthenticationError): UserSignOutFailure => ({
  error,
  type: TypeKeys.USER_SIGNOUT_FAILURE,
});

export interface UserSignOutFailure {
  type: TypeKeys.USER_SIGNOUT_FAILURE;
  error: AuthenticationError;
}

export const userCreation = (email: string, password: string): ThunkResult<void> => async (dispatch) => {
  dispatch(userCreationStart());

  try {
    await Authentication.createUser(email, password);
    dispatch(userCreationSuccess);
    Router.replace('/');
  } catch (e) {
    dispatch(userCreationFailure(e));
  }
};

export const signin = (method: SigninMethods, options: ISigninOptions): ThunkResult<void> => async (dispatch) => {
  if (method === SigninMethods.CLASSIC) {
    dispatch(userLoginStart());
  }

  try {
    const user = await Authentication.signin(method, options);
    dispatch(userLoginSuccess(user));
    Router.replace('/');
  } catch (e) {
    dispatch(userLoginFailure(e));
  }
};

export const signout = (): ThunkResult<void> => async (dispatch) => {
  dispatch(userSignOutStart());

  try {
    await Authentication.disconnect();
    dispatch(userSignOutSuccess());
  } catch (e) {
    dispatch(userSignOutFailure(e));
  }
};

export type UserActions =
  | UserLoginSuccess
  | UserLoginFailed
  | UserCreationStart
  | UserCreationFailure
  | UserCreationSuccess
  | UserLogout
  | UserLoginStart
  | UserServerAuth
  | UserSignOutStart
  | UserSignOutSuccess
  | UserSignOutFailure;
