import ErrorSvg from '@assets/svg/error.svg';
import InfoSvg from '@assets/svg/info.svg';
import SuccessSvg from '@assets/svg/sucess.svg';
import WarningSvg from '@assets/svg/warning.svg';
import colors from '@constants/colors';
import { PicktusMessageLevel } from '@store/reducers/message';
import React, { Component } from 'react';

export interface INotificationProps {
  text: string;
  level: PicktusMessageLevel;
}

class Notification extends Component<INotificationProps> {
  public renderIcon() {
    const { level } = this.props;

    switch (level) {
      case PicktusMessageLevel.ERROR:
        return <ErrorSvg height="32" width="32" className="icon" />;
      case PicktusMessageLevel.WARNING:
        return <WarningSvg height="32" width="32" className="icon" />;
      case PicktusMessageLevel.SUCCESS:
        return <SuccessSvg height="32" width="32" className="icon" />;
      default:
        return <InfoSvg height="32" width="32" className="icon" />;
    }
  }

  public render(): React.ReactElement<Notification> {
    const { text, level } = this.props;
    return (
      <div>
        <div className={`notification notification--${level}`}>
          <div className="iconContainer">{this.renderIcon()}</div>
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
            color: ${colors.primary};
            width: 280px;
            min-height: 5rem;
            background-color: ${colors.secondary};
            border-radius: 3px;
            box-shadow: 11px 10px 34px -7px rgba(0, 0, 0, 0.49);
          }

          .notification--${PicktusMessageLevel.ERROR} {
            background-color: ${colors.error};
            color: ${colors.white};
          }

          .notification--${PicktusMessageLevel.SUCCESS} {
            background-color: ${colors.green};
            color: ${colors.white};
          }

          .notification--${PicktusMessageLevel.WARNING} {
            background-color: ${colors.warning};
            color: ${colors.primary};
          }

          .iconContainer {
            margin-right: 1rem;
          }

          .icon {
            fill: ${colors.secondary};
          }

          .notification--${PicktusMessageLevel.SUCCESS} .icon {
            fill: ${colors.lightGreen};
          }

          .notification--${PicktusMessageLevel.INFO} .icon {
            fill: ${colors.primary};
          }

          .notification--${PicktusMessageLevel.WARNING} .icon {
            fill: ${colors.primary};
          }
        `}</style>
      </div>
    );
  }
}

export default Notification;
