import colors from '@constants/colors';
import { borderRadius, fontFamily } from '@constants/styles';
import { PicktusMessageLevel } from '@store/reducers/message';
import React, { Component } from 'react';
import MessageIcon from '../MessageIcon';

export interface ISnackBarProps {
  text: string;
  level: PicktusMessageLevel;
}

class SnackBar extends Component<ISnackBarProps> {
  public render(): React.ReactElement<SnackBar> {
    const { text, level } = this.props;
    return (
      <div>
        <div className={`snackbar snackbar--${level}`}>
          <MessageIcon level={level} />
          <p className="text">{text}</p>
        </div>
        <style jsx>{`
          .snackbar {
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: ${fontFamily};
            background: ${colors.primary};
            padding: 1rem;
            color: ${colors.white};
            font-size: 1rem;
            box-shadow: 0 0 25px rgba(33, 33, 33, 0.5);
            border-radius: ${borderRadius};
            box-sizing: border-box;
            animation: 0.3s down ease 1;
          }

          .text {
            height: 40px;
            line-height: 40px;
            padding: 0 10px;
            text-align: center;
          }

          .snackbar--${PicktusMessageLevel.ERROR} {
            background-color: ${colors.error};
            color: ${colors.white};
          }

          .snackbar--${PicktusMessageLevel.SUCCESS} {
            background-color: ${colors.green};
            color: ${colors.white};
          }

          .snackbar--${PicktusMessageLevel.WARNING} {
            background-color: ${colors.warning};
            color: ${colors.black};
          }
        `}</style>
      </div>
    );
  }
}

export default SnackBar;
