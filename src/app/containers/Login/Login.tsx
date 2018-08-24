import Background from '@components/Background';
import LoginHandler from '@components/LoginHandler';
import Logo from '@components/Logo';
import colors from '@constants/colors';
import React, { Component } from 'react';

class Login extends Component {
  public render(): React.ReactElement<Login> {
    return (
      <Background>
        <div className="container">
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
              padding: 2rem;
              box-sizing: border-box;
            }

            .form {
              height: 100%;
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .login {
              background-color: ${colors.primary}cd;
              padding-right: 2rem;
              box-shadow: 11px 10px 34px -7px rgba(0, 0, 0, 0.49);
              display: flex;
              position: relative;
            }

            .login::after {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              content: '';
              width: calc(100% + 2rem);
              height: calc(100% + 2rem);
              border: 3px solid transparent;
              border-image: linear-gradient(to bottom, ${colors.primary} 60%, ${colors.secondary} 100%);
              border-image-slice: 1;
            }
          `}</style>
        </div>
      </Background>
    );
  }
}

export default Login;
