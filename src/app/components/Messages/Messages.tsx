import React, { Component } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';
import { IMessageHandlerProps, IMessageHandlerState } from './Messages.type';
import Notification from './Notification';

class MessageHandler extends Component<IMessageHandlerProps, IMessageHandlerState> {
  public static defaultProps = {
    notifications: [],
    snackbars: [],
  };

  public render(): React.ReactElement<MessageHandler> {
    const { notifications } = this.props;
    return (
      <div className="container">
        <TransitionGroup className="notifications" appear={true}>
          {notifications.map((value, key) => {
            if (key === 0) {
              return (
                <Transition key={value.id} timeout={700} mountOnEnter={true} unmountOnExit={true}>
                  {(status) => (
                    <div className={`notification__container notification__container--${status}`}>
                      <Notification text={value.text} level={value.level} />
                    </div>
                  )}
                </Transition>
              );
            }
          })}
        </TransitionGroup>
        <style jsx>{`
          .container {
          }

          .notification__container {
            position: absolute;
            top: 4vh;
            right: -3px;
            transition: all 700ms ease-out;
            transform: translateX(120%);
            z-index: 1000;
          }

          .notification__container--entering,
          .notification__container--entered {
            transform: translateX(0%);
          }

          .notification__container--exiting,
          .notification__container--exited {
            transform: translateX(120%);
          }
        `}</style>
      </div>
    );
  }
}

export default MessageHandler;
