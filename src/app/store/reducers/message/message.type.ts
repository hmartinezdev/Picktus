export interface IMessageType {
  snackbar: Array<IPicktusError | IPicktusMessage>;
  notification: Array<IPicktusError | IPicktusMessage>;
}
