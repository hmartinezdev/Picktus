import Button from '@components/Button';
import Input from '@components/Input';
import colors from '@constants/colors';
import Authentication from '@services/authentication';
import React, { ChangeEvent, PureComponent, SyntheticEvent } from 'react';

export interface SubscribeHandlerState {
  mail: string;
  password: string;
  comfirmPassword: string;
}

class SubscribeHandler extends PureComponent<{}, SubscribeHandlerState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      comfirmPassword: '',
      mail: '',
      password: '',
    };
  }

  private onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    this.setState({ password: value });
  };

  private onMailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    this.setState({ mail: value });
  };

  private onComfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    this.setState({ comfirmPassword: value });
  };

  private onSubscribeClick = () => {
    Authentication.createUser(this.state.mail, this.state.password);
  };

  public render(): React.ReactElement<SubscribeHandler> {
    return (
      <div className="container">
        <button className="trigger">You don't have an account?</button>
        <div className="form">
          <Input name="mail" placeholder="Mail" onChange={this.onMailChange} />
          <Input name="password" placeholder="Password" type="password" onChange={this.onPasswordChange} />
          <Input
            name="comfirmPassword"
            placeholder="Confirm password"
            type="password"
            onChange={this.onComfirmPasswordChange}
          />
          <Button text="Subscribe" onClick={this.onSubscribeClick} />
        </div>
        <style jsx>{`
          .trigger {
            font-size: 1.2rem;
            line-height: 2.8rem;
            background-color: ${colors.secondary}89;
            padding: 0 0.8rem;
            height: 2.8rem;
            font-family: 'Josefin Sans', sans-serif;
            color: ${colors.primary};
            border-radius: 3px;
            margin-bottom: 1.3rem;
            transition: background-color ease-in 200ms;
            border: none;
            width: 100%;
            outline: none;
            cursor: pointer;
          }

          .trigger:hover {
            background-color: ${colors.secondary}cd;
          }

          .form {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 4.1rem;
            left: 0;
            border-radius: 3px;
            width: 100%;
            min-height: calc(100% - 4.1rem);
            padding: 1rem 0;
            background-color: ${colors.primary};
            z-index: 2;
          }
        `}</style>
      </div>
    );
  }
}

export default SubscribeHandler;
