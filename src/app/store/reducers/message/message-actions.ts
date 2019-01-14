import { ThunkAction } from 'redux-thunk';
import { IMessageState, IPicktusError, IPicktusMessage } from './message.type';

export type ThunkResult<R> = ThunkAction<R, IMessageState, undefined, DismissNotification>;

export enum TypeKeys {
  MESSAGE_DISMISS_NOTIFICATION = 'MESSAGE_DISMISS_NOTIFICATION',
  MESSAGE_DISMISS_SNACKBAR = 'MESSAGE_DISMISS_SNACKBAR',
  MESSAGE_DISPLAY_SNACKBAR = 'MESSAGE_DISPLAY_SNACKBAR',
  MESSAGE_DISPLAY_NOTIFICATION = 'MESSAGE_DISPLAY_NOTIFICATION',
}

export interface DisplaySnackBar {
  type: TypeKeys.MESSAGE_DISPLAY_SNACKBAR;
  message: IPicktusError | IPicktusMessage;
}

export const displaySnackBar = (message: IPicktusError | IPicktusMessage): DisplaySnackBar => ({
  message,
  type: TypeKeys.MESSAGE_DISPLAY_SNACKBAR,
});

export interface DisplayNotification {
  type: TypeKeys.MESSAGE_DISPLAY_NOTIFICATION;
  message: IPicktusError | IPicktusMessage;
}

export const DisplayNotification = (message: IPicktusError | IPicktusMessage): DisplayNotification => ({
  message,
  type: TypeKeys.MESSAGE_DISPLAY_NOTIFICATION,
});

export interface DismissNotification {
  type: TypeKeys.MESSAGE_DISMISS_NOTIFICATION;
}

export const dismissNotification = (): DismissNotification => ({
  type: TypeKeys.MESSAGE_DISMISS_NOTIFICATION,
});

export interface DismissSnackBar {
  type: TypeKeys.MESSAGE_DISMISS_SNACKBAR;
}

export const dismissSnackBar = (): DismissSnackBar => ({
  type: TypeKeys.MESSAGE_DISMISS_SNACKBAR,
});

export type MessageActions = DismissNotification | DismissSnackBar | DisplayNotification | DisplaySnackBar;
