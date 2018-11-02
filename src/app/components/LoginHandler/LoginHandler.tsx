import Facebook from '@assets/svg/facebook.svg';
import Google from '@assets/svg/googleplus.svg';
import Twitter from '@assets/svg/twitter.svg';
import Button from '@components/Button';
import Input from '@components/Input';
import SubscribeHandler from '@components/SubscribeHandler';
import colors from '@constants/colors';
import React, { ChangeEvent, Component } from 'react';
import { ILoginHandlerProps, ILoginHandlerState } from './LoginHandler.type';

class LoginHandler extends Component<ILoginHandlerProps, ILoginHandlerState> {
  constructor(props: ILoginHandlerProps) {
    super(props);
    this.state = {
      inputs: {},
    };
  }

  public onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target;
    if (name !== 'open') {
      this.setState({ inputs: { ...this.state.inputs, [name]: value } });
    }
  };

  public onClick = (): void => {
    return undefined;
  };

  public render(): React.ReactElement<LoginHandler> {
    const { facebookLogin, googleLogin, twitterLogin } = this.props;
    return (
      <div className="container">
        <div className="login">
          <Input placeholder="Mail" onChange={this.onChange} name="mail" />
          <Input placeholder="Password" type="password" onChange={this.onChange} name="password" />
          <Button text="Login" onClick={this.onClick} />
          <div className="socialButtons">
            <Button onClick={facebookLogin}>
              <Facebook className="social" />
            </Button>
            <Button onClick={googleLogin}>
              <Google className="social" />
            </Button>
            <Button onClick={twitterLogin}>
              <Twitter className="social" />
            </Button>
          </div>
        </div>
        <SubscribeHandler />
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
            margin: 0.7rem 1.4rem;
          }
        `}</style>
      </div>
    );
  }
}
export default LoginHandler;
