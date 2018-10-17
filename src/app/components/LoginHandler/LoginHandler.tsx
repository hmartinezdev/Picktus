import Google from '@assets/svg/googleplus.svg';
import Facebook from '@assets/svg/facebook.svg';
import Instagram from '@assets/svg/instagram.svg';
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
          <div className="socialButtons">
            <Button>
              <Facebook className="social" />
            </Button>
            <Button>
              <Google className="social" />
            </Button>
            <Button>
              <Instagram className="social" />
            </Button>
          </div>
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
            padding: 1.5rem 0;
            box-sizing: border-box;
            border-radius: 3px;
            box-shadow: 11px 10px 34px -7px rgba(0, 0, 0, 0.49);
          }

          .socialButtons {
            display: flex;
            justify-content: space-between;
            width: 75%;
          }

          :global(.socialButtons.socialButtons > button:nth-child(2)) {
            margin: 0.7rem 0.5rem;
          }
        `}</style>
      </div>
    );
  }
}
export default LoginHandler;
