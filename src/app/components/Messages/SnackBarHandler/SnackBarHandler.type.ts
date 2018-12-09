import { IPicktusError, IPicktusMessage } from '@store/reducers/message';
import { DismissSnackBar } from '@store/reducers/message/message-actions';

export interface IReduxStateProps {
  snackbars: Array<IPicktusError | IPicktusMessage>;
}

export interface IMessageHandlerState {
  snackbars: IPicktusError | IPicktusMessage | null;
}

export interface IDispatchProps {
  dismissSnackBar: () => DismissSnackBar;
}

export type ISnackBarHandlerProps = IReduxStateProps & IDispatchProps;
