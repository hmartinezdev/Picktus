import { ActionTypes } from '../action.type';
import { TypeKeys } from './user-actions';
import { IUserState } from './user.type';

export default function user(state: IUserState = { authenticated: false }, action: ActionTypes): IUserState {
  switch (action.type) {
    case TypeKeys.USER_LOGIN_SUCCESS:
      return {
        ...state,
        authenticated: true,
        user: {
          email: action.user.email || '',
          emailVerified: action.user.emailVerified || false,
          name: action.user.displayName || '',
          photoUrl: action.user.photoURL || '',
          uid: action.user.uid,
        },
      };
    case TypeKeys.USER_LOGIN_FAILED:
      return { ...state, authenticated: false };
    case TypeKeys.USER_LOGOUT: {
      return { ...state, authenticated: false, user: undefined };
    }
    case TypeKeys.USER_CREATION_START:
      return { ...state, creationInProgress: true };
    case TypeKeys.USER_CREATION_FAILURE:
      return { ...state, creationInProgress: false };
    case TypeKeys.USER_CREATION_SUCCESS:
      return { ...state, creationInProgress: false };
    default:
      return state;
  }
}
