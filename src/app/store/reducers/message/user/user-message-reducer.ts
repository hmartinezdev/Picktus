import { ActionTypes } from '../../action.type';
import { TypeKeys as UserTypeKeys } from '../../user/user-actions';
import messageGenerator from '../message-generator';
import { IMessageState, PicktusMessageDisplay, PicktusMessageLevel } from '../message.type';

export default function user(
  state: IMessageState = {
    notifications: [],
    snackbars: [],
  },
  action: ActionTypes
): IMessageState {
  switch (action.type) {
    case UserTypeKeys.USER_CREATION_FAILURE:
    case UserTypeKeys.USER_LOGIN_FAILURE:
      if (!action.error.formatedMessage) {
        return state;
      }
      return {
        ...state,
        notifications: [
          ...state.notifications,
          messageGenerator(action.error.formatedMessage, PicktusMessageLevel.ERROR, PicktusMessageDisplay.NOTIFICATION),
        ],
      };
    case UserTypeKeys.USER_CREATION_SUCCESS:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          messageGenerator(
            'You have successfully created your account!',
            PicktusMessageLevel.SUCCESS,
            PicktusMessageDisplay.NOTIFICATION
          ),
        ],
      };
    case UserTypeKeys.USER_LOGIN_SUCCESS:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          messageGenerator(
            'You have successfully logged in!',
            PicktusMessageLevel.SUCCESS,
            PicktusMessageDisplay.NOTIFICATION
          ),
        ],
      };
    case UserTypeKeys.USER_LOGOUT:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          messageGenerator(
            'You have successfully logged out!',
            PicktusMessageLevel.SUCCESS,
            PicktusMessageDisplay.NOTIFICATION
          ),
        ],
      };
    default:
      return state;
  }
}
