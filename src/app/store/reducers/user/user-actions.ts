import Authentication, { SigninMethods } from '@services/authentication';
import AuthenticationError from '@services/authentication/AuthenticationError';
import firebase from 'firebase';
import { ThunkAction } from 'redux-thunk';
import { IUserState } from './user.type';

export type ThunkResult<R> = ThunkAction<R, IUserState, undefined, UserActions>;

export enum TypeKeys {
  USER_SERVER_AUTH = 'USER_SERVER_ATUH',
  USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS',
  USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE',
  USER_LOGIN_START = 'USER_LOGIN_START',
  USER_CREATION_START = 'USER_CREATION_START',
  USER_CREATION_SUCCESS = 'USER_CREATION_SUCCESS',
  USER_CREATION_FAILURE = 'USER_CREATION_FAILURE',
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

export const UserCreationSuccess = (): UserCreationSuccess => ({
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

export const userCreation = (mail: string, password: string): ThunkResult<void> => async (dispatch) => {
  dispatch(userCreationStart());

  try {
    await Authentication.createUser(mail, password);
    dispatch(UserCreationSuccess);
  } catch (e) {
    dispatch(userCreationFailure(e));
  }
};

export const signin = (method: SigninMethods, options: IStringMap): ThunkResult<void> => async (dispatch) => {
  if (method === SigninMethods.CLASSIC) {
    dispatch(userLoginStart());
  }

  try {
    const user = await Authentication.signin(method, options);
    dispatch(userLoginSuccess(user));
  } catch (e) {
    dispatch(userLoginFailure(e));
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
  | UserServerAuth;
