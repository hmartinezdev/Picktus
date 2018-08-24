import Input from '@components/Input';
import colors from '@constants/colors';
import React, { Component } from 'react';

class LoginHandler extends Component {
  public render(): React.ReactElement<LoginHandler> {
    return (
      <div className="container">
        <Input />
        <style jsx>{`
          .container {
            background-color: ${colors.primary};
          }
        `}</style>
      </div>
    );
  }
}
export default LoginHandler;
