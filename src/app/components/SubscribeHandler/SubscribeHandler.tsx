import Button from '@components/Button';
import FormError from '@components/FormError';
import Input from '@components/Input';
import colors from '@constants/colors';
import Authentication from '@services/authentication';
import React, { ChangeEvent, PureComponent, ReactText } from 'react';
import Transition from 'react-transition-group/Transition';

export interface SubscribeHandlerState {
  open: boolean;
  mail: string;
  password: string;
  comfirmPassword: string;
  errors: ReactText[];
}

class SubscribeHandler extends PureComponent<{}, SubscribeHandlerState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      comfirmPassword: '',
      errors: [],
      mail: '',
      open: false,
      password: '',
    };
  }

  private pushError = (error: string): void => {
    this.setState((prevState) => ({
      errors: [...prevState.errors, this.state.errors.push(error)],
    }));
  };

  public onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    this.setState({ password: value });

    this.pushError(
      'Password must be minimum eight characters,  at least one letter, one number and one special character'
    );
  };

  public onMailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    this.setState({ mail: value });

    this.pushError('You must use a valid mail address');
  };

  public onComfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    this.setState({ comfirmPassword: value });

    this.pushError('Password comfirmation does not match password');
  };

  public onSubscribeClick = () => {
    Authentication.createUser(this.state.mail, this.state.password);
  };

  public onTriggerClick = () => {
    this.setState({ open: !this.state.open });
  };

  public render(): React.ReactElement<SubscribeHandler> {
    return (
      <div className="container">
        <button onClick={this.onTriggerClick} className="trigger">
          You don't have an account?
        </button>
        <Transition in={this.state.open} timeout={200} mountOnEnter={true} unmountOnExit={true}>
          {(state) => (
            <div className={`formContainer formContainer--${state}`}>
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
              <FormError
                text="Password must be minimum eight characters, 
            at least one letter, one number and one special character"
              />
              <FormError text="You must use a valid mail address" />
              <FormError text="Password comfirmation does not match password" />
            </div>
          )}
        </Transition>
        <style jsx>{`
          .trigger {
            font-size: 0.9rem;
            line-height: 2.5rem;
            background-color: ${colors.secondary}89;
            padding: 0 0.8rem;
            height: 2.3rem;
            font-family: 'Josefin Sans', sans-serif;
            color: ${colors.primary};
            border-radius: 3px;
            margin-bottom: 0.8rem;
            transition: background-color ease-in 200ms;
            border: none;
            width: 100%;
            outline: none;
            cursor: pointer;
          }

          .trigger:hover {
            background-color: ${colors.secondary}cd;
          }

          .formContainer {
            left: 0;
            top: 3rem;
            position: absolute;
            width: 100%;
            z-index: 2;
            transition: all 200ms ease-in;
            opacity: 0;
            transform: scale(1.2, 1.2);
          }

          .formContainer--entered {
            opacity: 1;
            transform: scale(1, 1);
          }

          .formContainer--exiting,
          .formContainer--exited {
            opacity: 0;
            transform: scale(1.2, 1.2);
          }

          .formContainer .form {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border-radius: 3px;
            min-height: calc(100% - 4.1rem);
            padding: 1rem 0;
            background-color: ${colors.primary};
            margin-bottom: 1.5rem;
          }
        `}</style>
      </div>
    );
  }
}

export default SubscribeHandler;
