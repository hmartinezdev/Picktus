import Authentication from '@services/authentication';
import firebase from 'firebase';
import { ThunkAction } from 'redux-thunk';
import { IUserState } from './user.type';

export type ThunkResult<R> = ThunkAction<R, IUserState, undefined, UserActions>;

export enum TypeKeys {
  USER_LOGIN_FAILED = 'USER_LOGIN_FAILED',
  USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS',
  USER_LOGIN_START = 'USER_LOGIN_START',
  USER_CREATION_START = 'USER_CREATION_START',
  USER_CREATION_SUCCESS = 'USER_CREATION_SUCCESS',
  USER_CREATION_FAILURE = 'USER_CREATION_FAILURE',
  USER_LOGOUT = 'USER_LOGOUT',
}

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
  type: TypeKeys.USER_LOGIN_FAILED;
  error: string;
}

export const userLoginFailed = (error: string): UserLoginFailed => ({
  error,
  type: TypeKeys.USER_LOGIN_FAILED,
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
  error: string;
}

export const UserCreationFailure = (error: string): UserCreationFailure => ({
  error,
  type: TypeKeys.USER_CREATION_FAILURE,
});

export const userCreation = (mail: string, password: string): ThunkResult<void> => async (dispatch) => {
  dispatch(userCreationStart());

  try {
    await Authentication.createUser(mail, password);
  } catch (e) {
    dispatch(UserCreationFailure(e.message));
  }
};

export const facebookLogin = (): ThunkResult<void> => async (dispatch) => {
  try {
    await Authentication.facebookAuth();
  } catch (e) {
    dispatch(userLoginFailed(e.message));
  }
};

export const googleLogin = (): ThunkResult<void> => async (dispatch) => {
  try {
    await Authentication.googleAuth();
  } catch (e) {
    dispatch(userLoginFailed(e.message));
  }
};

export const twitterLogin = (): ThunkResult<void> => async (dispatch) => {
  try {
    await Authentication.twitterAuth();
  } catch (e) {
    dispatch(userLoginFailed(e.message));
  }
};

export const classicLogin = (mail: string, password: string): ThunkResult<void> => async (dispatch) => {
  dispatch(userLoginStart());

  try {
    await Authentication.signin(mail, password);
  } catch (e) {
    dispatch(userLoginFailed(e.message));
  }
};

export type UserActions =
  | UserLoginSuccess
  | UserLoginFailed
  | UserCreationStart
  | UserCreationFailure
  | UserCreationSuccess
  | UserLogout
  | UserLoginStart;
