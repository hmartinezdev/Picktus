import { ActionTypes } from '../action.type';
import { TypeKeys as UserTypeKeys } from '../user/user-actions';
import { TypeKeys as MessageTypeKeys } from './message-actions';
import messageGenerator from './message-generator';
import { IMessageState } from './message.type';
import UserMessageReducer from './user';

export default function user(
  state: IMessageState = {
    notifications: [],
    snackbars: [],
  },
  action: ActionTypes
): IMessageState {
  switch (action.type) {
    case MessageTypeKeys.MESSAGE_DISMISS_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.slice(1),
      };
    case MessageTypeKeys.MESSAGE_DISMISS_SNACKBAR:
      return {
        ...state,
        snackbars: state.snackbars.slice(1),
      };
    case MessageTypeKeys.MESSAGE_DISPLAY_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, messageGenerator(action.message, action.level)],
      };
    case MessageTypeKeys.MESSAGE_DISPLAY_SNACKBAR:
      return {
        ...state,
        snackbars: [...state.snackbars, messageGenerator(action.message, action.level)],
      };
    case UserTypeKeys.USER_CREATION_FAILURE:
    case UserTypeKeys.USER_CREATION_START:
    case UserTypeKeys.USER_CREATION_SUCCESS:
    case UserTypeKeys.USER_LOGIN_FAILURE:
    case UserTypeKeys.USER_LOGIN_START:
    case UserTypeKeys.USER_LOGIN_SUCCESS:
    case UserTypeKeys.USER_LOGOUT:
    case UserTypeKeys.USER_SERVER_AUTH:
      return UserMessageReducer(state, action);
    default:
      return state;
  }
}
