import Facebook from '@assets/svg/facebook.svg';
import Google from '@assets/svg/googleplus.svg';
import Twitter from '@assets/svg/twitter.svg';
import Button from '@components/Button';
import ButtonLink from '@components/ButtonLink';
import Input from '@components/Input';
import colors from '@constants/colors';
import { borderRadius, boxShadow } from '@constants/styles';
import { SigninMethods } from '@services/authentication';
import Router from 'next/router';
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

  public onLoginClick = () => {
    const { signin } = this.props;
    const { email, password } = this.state.inputs;

    signin(SigninMethods.CLASSIC, { email, password });
  };

  public onFacebookClick = () => {
    const { signin } = this.props;

    signin(SigninMethods.FACEBOOK, {});
  };

  public onGoogleClick = () => {
    const { signin } = this.props;

    signin(SigninMethods.GOOGLE, {});
  };

  public onTwitterClick = () => {
    const { signin } = this.props;

    signin(SigninMethods.TWITTER, {});
  };

  public onSubscribeClick = () => {
    Router.push('/subscribe');
  };

  public render(): React.ReactElement<LoginHandler> {
    return (
      <div className="container">
        <div className="login">
          <div className="form">
            <Input placeholder="Mail" onChange={this.onChange} name="email" />
            <Input placeholder="Password" type="password" onChange={this.onChange} name="password" />
            <Button text="Login" onClick={this.onLoginClick} />
          </div>
          <div className="socialButtons">
            <Button onClick={this.onFacebookClick}>
              <Facebook className="social" />
            </Button>
            <Button onClick={this.onGoogleClick}>
              <Google className="social" />
            </Button>
            <Button onClick={this.onTwitterClick}>
              <Twitter className="social" />
            </Button>
          </div>
        </div>
        <ButtonLink prefetch={true} text="I don't have an account!" href="/auth/subscribe" dark />
        <style jsx>{`
          .container {
            position: relative;
          }

          .login {
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: ${colors.primary};
            padding: 1.5rem 1.5rem;
            border-radius: ${borderRadius};
            box-shadow: ${boxShadow};
          }

          .form {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 16rem;
          }

          .socialButtons {
            display: flex;
            justify-content: space-between;
            width: 16rem;
          }

          :global(.socialButtons.socialButtons > button:nth-child(2)) {
            margin: 0.7rem 1.1rem;
          }
        `}</style>
      </div>
    );
  }
}
export default LoginHandler;
