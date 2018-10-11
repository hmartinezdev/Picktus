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
              padding: 2rem 0;
              box-sizing: border-box;
              overflow: auto;
            }

            .form {
              height: 100%;
              width: 100%;
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              align-items: center;
              margin-top: 2.5rem;
            }

            .login {
              background-color: ${colors.primary}cd;
              box-shadow: 11px 10px 34px -7px rgba(0, 0, 0, 0.49);
              display: flex;
              position: relative;
              border-radius: 3px;
            }

            .login::after {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              content: '';
              width: calc(100% + 1.2rem);
              height: calc(100% + 1.2rem);
              border: 2px solid transparent;
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
