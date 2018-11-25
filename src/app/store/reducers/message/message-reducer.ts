import { ActionTypes } from '../action.type';
import { IMessageState } from './message.type';

export default function user(
  state: IMessageState = { notification: [], snackbar: [] },
  action: ActionTypes
): IMessageState {
  switch (action.type) {
    default:
      return state;
  }
}
