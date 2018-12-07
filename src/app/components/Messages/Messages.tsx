import React, { Component } from 'react';
import { IMessageHandlerProps, IMessageHandlerState } from './Messages.type';
import NotificationHandler from './NotificationsHandler';

class MessageHandler extends Component<IMessageHandlerProps, IMessageHandlerState> {
  public static defaultProps = {
    snackbars: [],
  };

  public render(): React.ReactElement<MessageHandler> {
    return (
      <div className="container">
        <NotificationHandler />
        <style jsx>{`
          .container {
          }
        `}</style>
      </div>
    );
  }
}

export default MessageHandler;
