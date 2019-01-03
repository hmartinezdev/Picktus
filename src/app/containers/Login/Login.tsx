import LoginHandler from '@components/LoginHandler';
import Logo from '@components/Logo';
import colors from '@constants/colors';
import { borderRadius, boxShadow } from '@constants/styles';
import React, { Component } from 'react';

export interface ILoginPropsType {
  status: string;
}

class Login extends Component<ILoginPropsType> {
  public render(): React.ReactElement<Login> {
    const { status } = this.props;
    return (
      <div className={`container container--${status}`}>
        <div className="login">
          <Logo />
        </div>
        <div className="form">
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
            opacity: 0;
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

          .login {
            background-color: ${colors.primary};
            box-shadow: ${boxShadow};
            display: flex;
            position: relative;
            border-radius: ${borderRadius};
            transition: all 300ms ease-out;
            min-height: 8.5rem;
            max-height: 8.5rem;
          }
        `}</style>
      </div>
    );
  }
}

export default Login;
