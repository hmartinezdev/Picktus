import ErrorSvg from '@assets/svg/error.svg';
import InfoSvg from '@assets/svg/info.svg';
import SuccessSvg from '@assets/svg/sucess.svg';
import WarningSvg from '@assets/svg/warning.svg';
import colors from '@constants/colors';
import { PicktusMessageLevel } from '@store/reducers/message';
import React, { Component } from 'react';

export interface IMessageIconProps {
  level: PicktusMessageLevel;
  width: number;
  height: number;
}

class MessageIcon extends Component<IMessageIconProps> {
  public static defaultProps = {
    height: 32,
    width: 32,
  };

  public render(): React.ReactFragment {
    const { level, ...rest } = this.props;

    let icon = null;

    switch (level) {
      case PicktusMessageLevel.ERROR:
        icon = <ErrorSvg className="icon" key="icon" {...rest} />;
        break;
      case PicktusMessageLevel.WARNING:
        icon = <WarningSvg className="icon" key="icon" {...rest} />;
        break;
      case PicktusMessageLevel.SUCCESS:
        icon = <SuccessSvg className="icon" key="icon" {...rest} />;
        break;
      default:
        icon = <InfoSvg className="icon" key="icon" {...rest} />;
        break;
    }

    return [
      icon,
      <style key="style" jsx>{`
        .icon {
          fill: ${colors.secondary};
          margin-right: 0.3rem;
          min-height: ${rest.height};
          min-width: ${rest.width};
        }
      `}</style>,
    ];
  }
}

export default MessageIcon;
