import Button from '@components/Button';
import Input from '@components/Input';
import SubscribeHandler from '@components/SubscribeHandler';
import colors from '@constants/colors';
import React, { Component } from 'react';

class LoginHandler extends Component {
  public render(): React.ReactElement<LoginHandler> {
    return (
      <div className="container">
        <SubscribeHandler />
        <div className="login">
          <Input placeholder="Mail" />
          <Input placeholder="Password" type="password" />
          <Button text="Login" />
        </div>
        <style jsx>{`
          .container {
            position: relative;
          }

          .login {
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: ${colors.primary};
            min-width: 22rem;
            padding: 1.5rem;
            box-sizing: border-box;
            border-radius: 3px;
            box-shadow: 11px 10px 34px -7px rgba(0, 0, 0, 0.49);
          }
        `}</style>
      </div>
    );
  }
}
export default LoginHandler;
