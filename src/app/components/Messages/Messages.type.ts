import { IPicktusError, IPicktusMessage } from '@store/reducers/message';

export interface IReduxStateProps {
  snackbars: Array<IPicktusError | IPicktusMessage>;
  notifications: Array<IPicktusError | IPicktusMessage>;
}

export interface IMessageHandlerState {
  notification: IPicktusError | IPicktusMessage | null;
  snackbar: IPicktusError | IPicktusMessage | null;
}

export type IMessageHandlerProps = IReduxStateProps;
