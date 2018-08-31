import Button from '@components/Button';
import Input from '@components/Input';
import colors from '@constants/colors';
import React, { ChangeEvent, PureComponent } from 'react';

export interface SubscribeHandlerState {
  mail: string;
  password: string;
  comfirmPassword: string;
}

export enum Inputs {
  password = 'password',
  mail = 'mail',
  comfirmPassword = 'comfirmPassword',
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

  private onChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (Object.values(Inputs).include('name')) {
      this.setState({ [name]: value });
    }
  }

  public render(): React.ReactElement<SubscribeHandler> {
    return (
      <div className="container">
        <button className="trigger">You don't have an account?</button>
        <div className="form">
          <Input name={Inputs.mail} placeholder="Mail" onChange={this.onChange} />
          <Input name={Inputs.password} placeholder="Password" type="password" />
          <Input name={Inputs.comfirmPassword} placeholder="Confirm password" type="password" />
          <Button text="Subscribe" />
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
