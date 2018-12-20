import colors from '@constants/colors';
import { PicktusMessageLevel } from '@store/reducers/message';
import React, { Component } from 'react';
import MessageIcon from '../MessageIcon';

export interface INotificationProps {
  text: string;
  level: PicktusMessageLevel;
}

class Notification extends Component<INotificationProps> {
  public render(): React.ReactElement<Notification> {
    const { text, level } = this.props;
    return (
      <div>
        <div className={`notification notification--${level}`}>
          <MessageIcon level={level} />
          <p>{text}</p>
        </div>
        <style jsx>{`
          .notification {
            display: flex;
            align-items: center;
            box-sizing: border-box;
            padding: 1rem;
            font-size: 1.05rem;
            font-family: 'Josefin Sans', sans-serif;
            color: ${colors.white};
            width: 280px;
            min-height: 5rem;
            background-color: ${colors.primary};
            border-radius: 3px;
            box-shadow: 11px 10px 34px -7px rgba(0, 0, 0, 0.49);
          }

          .notification--${PicktusMessageLevel.ERROR} {
            background-color: ${colors.error};
          }

          .notification--${PicktusMessageLevel.SUCCESS} {
            background-color: ${colors.green};
          }

          .notification--${PicktusMessageLevel.WARNING} {
            background-color: ${colors.warning};
          }
        `}</style>
      </div>
    );
  }
}

export default Notification;
