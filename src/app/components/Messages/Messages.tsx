import React, { Component } from 'react';
import NotificationHandler from './NotificationsHandler';
import SnackBarHandler from './SnackBarHandler';

class MessageHandler extends Component<{}> {
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
