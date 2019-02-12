import { ActionTypes } from '../action.type';
import { TypeKeys } from './user-actions';
import { IUserState } from './user.type';

const initialState = { authenticated: false };

export default function user(state: IUserState = initialState, action: ActionTypes): IUserState {
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
    case TypeKeys.USER_SERVER_AUTH:
      return {
        ...state,
        authenticated: action.user ? true : false,
        user: action.user
          ? {
              email: action.user.email || '',
              emailVerified: action.user.emailVerified || false,
              name: action.user.displayName || '',
              photoUrl: action.user.photoURL || '',
              uid: action.user.uid,
            }
          : undefined,
      };
    case TypeKeys.USER_LOGIN_FAILURE:
      return { ...state, authenticated: false };
    case TypeKeys.USER_LOGOUT: {
      return initialState;
    }
    case TypeKeys.USER_CREATION_START:
      return { ...state, userCreation: { inProgress: true } };
    case TypeKeys.USER_CREATION_FAILURE:
      return { ...state, userCreation: { inProgress: false, error: true } };
    case TypeKeys.USER_CREATION_SUCCESS:
      return { ...state, userCreation: { inProgress: false, error: false } };
    default:
      return state;
  }
}
