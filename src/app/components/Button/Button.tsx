import colors from '@constants/colors';
import React, { Component } from 'react';

export interface PropTypes {
  text?: string;
  onClick?(): void;
}

class Button extends Component<PropTypes, {}> {
  public static defaultProps = {
    onClick: (): void => undefined,
    text: '',
  };

  public render(): React.ReactElement<Button> {
    const { onClick, text } = this.props;

    return (
      <button onClick={onClick} className="button">
        <span>{text}</span>
        <style jsx>{`
          .button {
            color: #ffffffd7;
            transition: all 0.5s;
            position: relative;
            text-align: center;
            width: 60%;
            cursor: pointer;
            font-family: 'Josefin Sans', sans-serif;
            boder-radius: 3px;
            padding: 0.9rem 0.8rem 0.9rem;
            font-size: 0.9rem;
            width: 75%;
            margin: 0.5rem 0;
            background: none;
            border: none;
            outline: none;
          }

          .button:active::after {
            background-color: ${colors.green}ca;
          }

          .button a {
            color: rgba(51, 51, 51, 1);
            text-decoration: none;
            display: block;
          }

          .button::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            background-color: ${colors.blue}45;
            transition: all 0.3s;
            boder-radius: 3px;
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
            border: 1px solid ${colors.green}ca;
            transform: scale(0.7, 0.7);
            boder-radius: 3px;
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
