import LoginHandler from '@components/LoginHandler';
import Logo from '@components/Logo';
import colors from '@constants/colors';
import React, { Component } from 'react';

export interface ILoginPropsType {
  status: string;
}

class Login extends Component<ILoginPropsType> {
  public render(): React.ReactElement<Login> {
    const { status } = this.props;
    return (
      <div className={`container container--${status}`}>
        <div className={`login login--${status}`}>
          <Logo />
        </div>
        <div className={`form form--${status}`}>
          <LoginHandler />
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
            overflow: auto;
            opacity: 1;
            transition: opacity 300ms ease-out;
          }

          .container--exiting,
          .container--exited {
            position: absolute;
            left: 0;
            top: 0;
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

          .form--exiting {
            opacity: 0;
          }

          .form--exited {
            opacity: 0;
          }

          .login {
            background-color: ${colors.primary};
            box-shadow: 11px 10px 34px -7px rgba(0, 0, 0, 0.49);
            display: flex;
            position: relative;
            border-radius: 3px;
            transition: all 300ms ease-out;
            min-height: 8.5rem;
            max-height: 8.5rem;
          }

          .login--exiting {
            animation: loginAnimation 600ms ease-out;
          }

          .logo-exit {
            opacity: 1;
          }
          .logo-exit-active {
            opacity: 0;
            transition: all 130ms ease-out;
          }

          @keyframes loginAnimation {
            0% {
              position: initial;
            }

            24% {
              position: initial;
            }

            25% {
              position: absolute;
              top: 0;
            }

            65% {
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              max-height: 100vh;
            }

            100% {
              height: 100vh;
              max-height: 100vh;
              width: 100vw;
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
            }
          }
        `}</style>
      </div>
    );
  }
}

export default Login;
