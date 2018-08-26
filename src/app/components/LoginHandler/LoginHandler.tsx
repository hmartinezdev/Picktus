import Button from '@components/Button';
import Input from '@components/Input';
import colors from '@constants/colors';
import React, { Component } from 'react';

class LoginHandler extends Component {
  public render(): React.ReactElement<LoginHandler> {
    return (
      <div className="container">
        <Input placeholder="Mail" />
        <Input placeholder="Password" type="password" />
        <Button />
        <style jsx>{`
          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: ${colors.primary}cd;
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
