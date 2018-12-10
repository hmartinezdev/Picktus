import { IPicktusError, IPicktusMessage } from '@store/reducers/message';
import { DismissNotification } from '@store/reducers/message/message-actions';

export interface IReduxStateProps {
  notifications: Array<IPicktusError | IPicktusMessage>;
}

export interface IMessageHandlerState {
  notification: IPicktusError | IPicktusMessage | null;
}

export interface IDispatchProps {
  dismissNotification: () => DismissNotification;
}

export type INotificationHandlerProps = IReduxStateProps & IDispatchProps;
