import { ActionTypes } from '../action.type';
import { TypeKeys as MessageTypeKeys } from './message-actions';
import { IMessageState } from './message.type';

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
    default:
      return state;
  }
}
