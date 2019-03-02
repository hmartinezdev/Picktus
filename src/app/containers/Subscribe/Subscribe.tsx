import Logo from '@components/Logo';
import SubscribeHandler from '@components/SubscribeHandler';
import colors from '@constants/colors';
import { borderRadius, boxShadow } from '@constants/styles';
import React, { Component } from 'react';

export interface ISubscribePropsType {
  status: string;
}

class Subscribe extends Component<ISubscribePropsType> {
  public render(): React.ReactElement<Subscribe> {
    const { status } = this.props;
    return (
      <div className={`container container--${status}`}>
        <div className={`logo logo--${status}`}>
          <Logo />
        </div>
        <div className="form">
          <SubscribeHandler />
        </div>
        <style jsx>{`
          .container {
            width: 100%;
            height: 100vh;
            display: flex;
            align-items: center;
            flex-direction: column;
            padding: 2rem 0;
            box-sizing: border-box;
            overflow: hidden;
            opacity: 1;
            transition: opacity 300ms ease-out;
          }

          .container--exiting,
          .container--exited {
            position: absolute;
            opacity: 0;
          }

          .logo {
            background-color: ${colors.primary};
            box-shadow: ${boxShadow};
            display: flex;
            position: relative;
            border-radius: ${borderRadius};
          }

          .logo--exiting,
          .logo--exited {
            box-shadow: none;
          }

          .form {
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            margin-top: 2.5rem;
            opacity: 1;
            transition: opacity 130ms ease-out;
          }
        `}</style>
      </div>
    );
  }
}

export default Subscribe;
