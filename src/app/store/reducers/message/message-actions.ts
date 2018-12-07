import { ThunkAction } from 'redux-thunk';
import { IMessageState } from './message.type';

export type ThunkResult<R> = ThunkAction<R, IMessageState, undefined, DismissNotification>;

export enum TypeKeys {
  MESSAGE_DISMISS_NOTIFICATION = 'MESSAGE_DISMISS_NOTIFICATION',
}

export interface DismissNotification {
  type: TypeKeys.MESSAGE_DISMISS_NOTIFICATION;
}

export const dismissNotification = (): DismissNotification => ({
  type: TypeKeys.MESSAGE_DISMISS_NOTIFICATION,
});

export type MessageActions = DismissNotification;
