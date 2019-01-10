import colors from '@constants/colors';
import { borderRadius, fontFamily } from '@constants/styles';
import Link from 'next/link';
import React, { Component, ReactElement } from 'react';

export interface IButtonLinkPropsType {
  text?: string;
  children?: ReactElement<any>;
  href: string;
  dark: boolean;
}

class ButtonLink extends Component<IButtonLinkPropsType, {}> {
  public static defaultProps = {
    dark: false,
    text: '',
  };

  public render(): React.ReactElement<ButtonLink> {
    const { href, text, children, dark } = this.props;

    return (
      <Link href={href} className={`button ${dark ? 'button--dark' : ''}`}>
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
            width: 100%;
            height: 2.35rem;
            min-width: 28%;
            margin: 0.7rem 0;
            background: none;
            border: none;
            outline: none;
          }

          .button--dark {
            color: ${colors.primary};
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

          .button--dark:hover {
            color: ${colors.secondary};
          }

          .button--dark::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: ${colors.secondary};
            transition-property: transform, opacity;
            transition: 0.3s ease-out;
            border-radius: ${borderRadius};
            cursor: pointer;
          }

          .button--dark:hover::before {
            opacity: 0;
            transform: scale(0.5, 0.5);
          }

          .button--dark::after {
            content: '';
            position: absolute;
            border: none;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            opacity: 0;
            transition-property: transform, opacity;
            transition: 0.3s ease-out;
            transform: scale(0.7, 0.7);
            background-color: ${colors.primary};
            border-radius: ${borderRadius};
            cursor: pointer;
          }

          .button--dark:hover::after {
            opacity: 1;
            transform: scale(1, 1);
            z-index: 1;
          }
        `}</style>
      </Link>
    );
  }
}

export default ButtonLink;
