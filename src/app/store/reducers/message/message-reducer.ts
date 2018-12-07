import { ActionTypes } from '../action.type';
import { TypeKeys as MessageTypeKeys } from './message-actions';
import { IMessageState } from './message.type';
import { PicktusMessageDisplay, PicktusMessageLevel } from './message.type';

export default function user(
  state: IMessageState = {
    notifications: [
      {
        display: PicktusMessageDisplay.NOTIFICATION,
        id: 'ok',
        level: PicktusMessageLevel.SUCCESS,
        text: 'erreur de test',
      },
      {
        display: PicktusMessageDisplay.NOTIFICATION,
        id: 'ok1',
        level: PicktusMessageLevel.ERROR,
        text: 'erreur de test',
      },
      {
        display: PicktusMessageDisplay.NOTIFICATION,
        id: 'ok2',
        level: PicktusMessageLevel.WARNING,
        text: 'erreur de test',
      },
      {
        display: PicktusMessageDisplay.NOTIFICATION,
        id: 'ok3',
        level: PicktusMessageLevel.INFO,
        text: 'erreur de test',
      },
    ],
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
    default:
      return state;
  }
}
