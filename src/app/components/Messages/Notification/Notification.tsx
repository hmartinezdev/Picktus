import colors from '@constants/colors';
import { borderRadius, boxShadow, fontFamily } from '@constants/styles';
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
          <div className="iconContainer">
            <MessageIcon level={level} />
          </div>
          <p>{text}</p>
        </div>
        <style jsx>{`
          .notification {
            display: flex;
            align-items: center;
            box-sizing: border-box;
            padding: 1rem;
            font-size: 1.05rem;
            font-family: ${fontFamily};
            color: ${colors.white};
            width: 100%;
            min-height: 5rem;
            background-color: ${colors.primary};
            border-radius: ${borderRadius};
            box-shadow: ${boxShadow};
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

          .iconContainer {
            min-width: 32px;
            margin-right: 0.6rem;
          }
        `}</style>
      </div>
    );
  }
}

export default Notification;
