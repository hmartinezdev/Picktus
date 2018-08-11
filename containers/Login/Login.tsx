import React, { Component } from 'react';
import Logo from '@components/Logo';
import Background from '@components/Background';

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
              background-color: #2d3047cd;
              padding-right: 2rem;
              box-shadow: 11px 10px 34px -7px rgba(0, 0, 0, 0.49);
            }
          `}</style>
        </div>
      </Background>
    );
  }
}

export default Login;
