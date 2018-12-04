import { PicktusMessageLevel } from '@store/reducers/message';
import React, { Component } from 'react';

export interface INotificationProps {
  text: string;
  level: PicktusMessageLevel;
}

class Notification extends Component<INotificationProps> {
  public render(): React.ReactElement<Notification> {
    const { text, level } = this.props;
    return (
      <div>
        <div className={`notification notification--${level}`}>{text}</div>
        <style jsx>{``}</style>
      </div>
    );
  }
}

export default Notification;
