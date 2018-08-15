import React, { Component } from 'react';
import Logo from '@components/Logo';
import Background from '@components/Background';
import colors from '@constants/colors';

class Login extends Component {
  render() {
    return (
      <Background>
        <div className="container">
          <div className="login">
            <Logo />
          </div>
          <style jsx>{`
            .container {
              width: 100%;
              height: 100vh;
              display: flex;
              justify-content: center;
              align-items: flex-start;
              padding: 2rem;
              box-sizing: border-box;
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
