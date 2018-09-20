import Authentication from '@services/authentication';
import { ThunkAction } from 'redux-thunk';
import { UserState } from './user.type';

export type ThunkResult<R> = ThunkAction<R, UserState, undefined, UserActions>;

export enum TypeKeys {
  USER_LOGIN_FAILED = 'USER_LOGIN_FAILED',
  USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS',
  USER_CREATION_START = 'USER_CREATION_START',
  USER_CREATION_SUCCESS = 'USER_CREATION_SUCCESS',
  USER_CREATION_FAILURE = 'USER_CREATION_FAILURE',
}

export interface UserLoginSuccess {
  type: TypeKeys.USER_LOGIN_SUCCESS;
  userInfos: object;
}

export const userLoginSuccess = (userInfos: object): UserLoginSuccess => ({
  type: TypeKeys.USER_LOGIN_SUCCESS,
  userInfos,
});

export interface UserLoginFailed {
  type: TypeKeys.USER_LOGIN_FAILED;
}

export const userLoginFailed = (): UserLoginFailed => ({
  type: TypeKeys.USER_LOGIN_FAILED,
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
    const res = await Authentication.createUser(mail, password);
  } catch (e) {
    dispatch(UserCreationFailure(e.message));
  }
};

export type UserActions =
  | UserLoginSuccess
  | UserLoginFailed
  | UserCreationStart
  | UserCreationFailure
  | UserCreationSuccess;
