export interface IReduxStateProps {
  snackbars: Array<IPicktusError | IPicktusMessage>;
  notifications: Array<IPicktusError | IPicktusMessage>;
}

export type IMessageHandlerProps = IReduxStateProps;
