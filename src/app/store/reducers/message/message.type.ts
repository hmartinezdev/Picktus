export interface IMessageState {
  snackbars: Array<IPicktusError | IPicktusMessage>;
  notifications: Array<IPicktusError | IPicktusMessage>;
}

export enum PicktusMessageLevel {
  WARNING = 'WARNING',
  SUCCESS = 'SUCCESS',
  INFO = 'INFO',
  ERROR = 'ERROR',
}

export interface IPicktusMessage {
  level: PicktusMessageLevel;
  text: string;
  id: string;
}

export interface IPicktusError extends IPicktusMessage {
  level: PicktusMessageLevel.ERROR;
}
