import { ActionTypes } from '../action.type';
import { TypeKeys } from './user-actions';

export interface UserState {
  authenticated: boolean;
  creation?: string;
}

export default function counter(state: UserState = { authenticated: false }, action: ActionTypes) {
  switch (action.type) {
    case TypeKeys.USER_LOGIN_SUCCESS:
      return { ...state, authenticated: true };
    case TypeKeys.USER_LOGIN_FAILED:
      return { ...state, authenticated: false };
    default:
      return state;
  }
}
