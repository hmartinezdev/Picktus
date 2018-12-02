import color from '@constants/colors';
import React, { Component } from 'react';

export interface INotificationProps {
  text: string;
  level: PicktusMessageDisplayType;
}

class Notification extends Component<INotificationProps> {
  public render(): React.ReactElement<Notification> {
    const { text, level } = this.props;
    return (
      <div>
        <div className={`notification notification--${level}`}>{text}</div>
        <style jsx>{`
          .notification {
            width: 200px;
            min-height: 100px;
            background-color: ${color.secondary};
            border-radius: 3px;
          }
        `}</style>
      </div>
    );
  }
}

export default Notification;
