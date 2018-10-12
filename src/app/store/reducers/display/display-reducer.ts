import { ActionTypes } from '../action.type';
import { TypeKeys as UserTypeKeys } from '../user/user-actions';
import { TypeKeys as DisplayTypeKeys } from './display-actions';
import { IDisplayState } from './display.type';

export default function user(state: IDisplayState = { loader: false }, action: ActionTypes): IDisplayState {
  switch (action.type) {
    case DisplayTypeKeys.DISPLAY_LOADER:
      return { ...state, loader: action.show };
    case UserTypeKeys.USER_CREATION_START:
      return { ...state, loader: true };
    case UserTypeKeys.USER_CREATION_FAILURE:
    case UserTypeKeys.USER_CREATION_SUCCESS:
      return { ...state, loader: false };
    default:
      return state;
  }
}
