import colors from '@constants/colors';
import { borderRadius, fontFamily } from '@constants/styles';
import React, { Component } from 'react';

export interface IButtonPropTypes {
  text?: string;
  children?: JSX.Element[] | JSX.Element;
  onClick(): void;
}

class Button extends Component<IButtonPropTypes, {}> {
  public static defaultProps = {
    text: '',
  };

  public render(): React.ReactElement<Button> {
    const { onClick, text, children } = this.props;

    return (
      <button onClick={onClick} className="button">
        {children ? children : <p className="text">{text}</p>}
        <style jsx>{`
          .button {
            display: flex;
            justify-content: center;
            align-items: center;
            color: ${colors.white};
            transition: all 0.5s;
            position: relative;
            text-align: center;
            cursor: pointer;
            font-family: ${fontFamily};
            border-radius: ${borderRadius};
            padding: 0 0.7rem;
            width: 75%;
            height: 2.35rem;
            min-width: 28%;
            margin: 0.7rem 0;
            background: none;
            border: none;
            outline: none;
          }

          :global(.button svg) {
            fill: ${colors.white};
            transition: all 0.5s;
          }

          .button:hover {
            color: ${colors.blue};
          }

          :global(.button:hover svg) {
            fill: ${colors.blue};
          }

          .text {
            line-height: 2.35rem;
            font-size: 0.75rem;
            z-index: 2;
          }

          .button:active::after {
            background-color: ${colors.green}ca;
          }

          .button a {
            color: rgba(51, 51, 51, 1);
            text-decoration: none;
            display: block;
            cursor: pointer;
          }

          .button::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: ${colors.blue}45;
            transition: all 0.3s;
            border-radius: ${borderRadius};
            cursor: pointer;
          }
          .button:hover::before {
            opacity: 0;
            transform: scale(0.5, 0.5);
          }
          .button::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            opacity: 0;
            transition: all 0.3s;
            border: 1px solid ${colors.lightGreen}ca;
            transform: scale(0.7, 0.7);
            border-radius: ${borderRadius};
            cursor: pointer;
          }

          .button:hover::after {
            opacity: 1;
            transform: scale(1, 1);
          }
        `}</style>
      </button>
    );
  }
}

export default Button;
