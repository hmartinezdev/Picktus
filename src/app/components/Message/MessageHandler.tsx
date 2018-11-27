import React, { Component } from 'react';
import { IMessageHandlerProps } from './MessageHandler.type';

class MessageHandler extends Component<IMessageHandlerProps> {
  public static defaultProps = {
    notifications: [],
    snackbars: [],
  };

  public render(): React.ReactElement<MessageHandler> {
    return <div />;
  }
}

export default MessageHandler;
