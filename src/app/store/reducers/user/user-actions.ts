export const actionType = {
  USER_LOGIN_FAILED: 'USER_LOGIN_FAILED',
  USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
};

export const userLoginSuccess = (userInfos) => {
  return {
    payload: { ...userInfos },
    type: actionType.USER_LOGIN_FAILED,
  };
};

export const userLoginFailed = () => {
  return {
    type: actionType.USER_LOGIN_FAILED,
  };
};
