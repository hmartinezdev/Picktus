export enum TypeKeys {
  USER_LOGIN_FAILED = 'USER_LOGIN_FAILED',
  USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS',
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
