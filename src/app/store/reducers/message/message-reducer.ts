import { ActionTypes } from '../action.type';
import { IMessageState } from './message.type';
import { PicktusMessageDisplay, PicktusMessageLevel } from './message.type';

export default function user(
  state: IMessageState = {
    notifications: [
      {
        display: PicktusMessageDisplay.NOTIFICATION,
        id: 'ok',
        level: PicktusMessageLevel.WARNING,
        text: 'erreur de test',
      },
    ],
    snackbars: [],
  },
  action: ActionTypes
): IMessageState {
  switch (action.type) {
    default:
      return state;
  }
}