import { IPicktusError, IPicktusMessage } from '@store/reducers/message';

export interface IReduxStateProps {
  snackbars: Array<IPicktusError | IPicktusMessage>;
}

export interface IMessageHandlerState {
  snackbar: IPicktusError | IPicktusMessage | null;
}

export type IMessageHandlerProps = IReduxStateProps;
