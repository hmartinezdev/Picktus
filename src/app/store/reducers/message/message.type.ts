export interface IMessageState {
  snackbars: Array<IPicktusError | IPicktusMessage>;
  notifications: Array<IPicktusError | IPicktusMessage>;
}

export enum PicktusMessageDisplay {
  SNACKBAR = 'SNACKBAR',
  NOTIFICATION = 'NOTIFICATION',
}

export enum PicktusMessageLevel {
  WARNING = 'WARNING',
  SUCCESS = 'SUCCESS',
  INFO = 'INFO',
  ERROR = 'ERROR',
}

export type PicktusMessageLevelType =
  | PicktusMessageLevel.WARNING
  | PicktusMessageLevel.SUCCESS
  | PicktusMessageLevel.INFO
  | PicktusMessageLevel.ERROR;

export type PicktusMessageDisplayType = PicktusMessageDisplay.SNACKBAR | PicktusMessageDisplay.NOTIFICATION;
