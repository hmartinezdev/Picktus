import React, { Component } from 'react';
import { IMessageHandlerProps, IMessageHandlerState } from './Messages.type';
import NotificationHandler from './NotificationsHandler';
import SnackBarHandler from './SnackBarHandler';

class MessageHandler extends Component<IMessageHandlerProps, IMessageHandlerState> {
  public static defaultProps = {
    snackbars: [],
  };

  public render(): React.ReactElement<MessageHandler> {
    return (
      <div className="container">
        <NotificationHandler />
        <SnackBarHandler />
      </div>
    );
  }
}

export default MessageHandler;
