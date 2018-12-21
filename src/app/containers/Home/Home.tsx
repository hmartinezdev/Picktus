import Background from '@components/Background';
import React, { Component } from 'react';

class Login extends Component {
  public render(): React.ReactElement<Login> {
    return (
      <Background>
        <div className="container">
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
          `}</style>
        </div>
      </Background>
    );
  }
}

export default Login;
