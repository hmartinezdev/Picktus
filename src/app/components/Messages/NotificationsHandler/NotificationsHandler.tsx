import React, { Component } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';
import Notification from '../Notification';
import { INotificationHandlerProps } from './NotificationsHandler.type';

class NotificationHandler extends Component<INotificationHandlerProps> {
  public static defaultProps = {
    notifications: [],
  };

  constructor(props: INotificationHandlerProps) {
    super(props);
  }

  private dismissNotification() {
    const { notifications, dismissNotification } = this.props;
    if (notifications.length > 0) {
      setTimeout(dismissNotification, 2000);
    }
  }

  public componentDidMount() {
    this.dismissNotification();
  }

  public componentDidUpdate(prevProps: INotificationHandlerProps) {
    const currentNotification = this.props.notifications[0];
    const previousNotification = prevProps.notifications[0];

    if (currentNotification && previousNotification && previousNotification.id !== currentNotification.id) {
      this.dismissNotification();
    }
  }

  public render(): React.ReactElement<Notification> {
    const { notifications } = this.props;

    return (
      <div>
        <TransitionGroup className="notifications" appear={true}>
          {notifications.map((value, key) => {
            if (key === 0) {
              return (
                <Transition key={value.id} timeout={700} mountOnEnter={true} unmountOnExit={true}>
                  {(status) => (
                    <div key={value.id} className={`notification__container notification__container--${status}`}>
                      <Notification text={value.text} level={value.level} />
                    </div>
                  )}
                </Transition>
              );
            }
          })}
        </TransitionGroup>
        <style jsx>{`
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

          @keyframes slideIn {
            from {
              transform: translateX(120%);
            }

            to {
              transform: translateX(0%);
            }
          }
        `}</style>
      </div>
    );
  }
}

export default NotificationHandler;
