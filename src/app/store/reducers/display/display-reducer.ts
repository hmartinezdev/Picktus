import { ActionTypes } from '../action.type';
import { TypeKeys as UserTypeKeys } from '../user/user-actions';
import { TypeKeys as DisplayTypeKeys } from './display-actions';
import { IDisplayState } from './display.type';

export default function user(state: IDisplayState = { loader: false }, action: ActionTypes): IDisplayState {
  switch (action.type) {
    case DisplayTypeKeys.DISPLAY_LOADER:
      return { ...state, loader: action.show };
    case UserTypeKeys.USER_LOGIN_START:
    case UserTypeKeys.USER_SIGNOUT_START:
      return { ...state, loader: true };
    case UserTypeKeys.USER_LOGIN_FAILURE:
    case UserTypeKeys.USER_LOGIN_SUCCESS:
    case UserTypeKeys.USER_SIGNOUT_SUCCESS:
    case UserTypeKeys.USER_SIGNOUT_FAILURE:
      return { ...state, loader: false };
    default:
      return state;
  }
}
