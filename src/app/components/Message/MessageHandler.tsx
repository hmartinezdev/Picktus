import React, { Component } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';
import { IMessageHandlerProps, IMessageHandlerState } from './MessageHandler.type';
import Notification from './Notification';

class MessageHandler extends Component<IMessageHandlerProps, IMessageHandlerState> {
  public static defaultProps = {
    notifications: [],
    snackbars: [],
  };

  public render(): React.ReactElement<MessageHandler> {
    const { notifications } = this.props;
    const notification = notifications[0];

    return (
      <div className="container">
        <TransitionGroup className="notifications">
          <Transition key={notification.id} timeout={200} mountOnEnter={true} unmountOnExit={true}>
            {(status) => (
              <div className={`notification__container notification__container--${status}`}>
                <Notification text={notification.text} level={notification.level} />
              </div>
            )}
          </Transition>
        </TransitionGroup>
        <style jsx>{`
          .notification__container {
            position: absolute;
            top: 10vh;
            right: 0;
          }
        `}</style>
      </div>
    );
  }
}

export default MessageHandler;
