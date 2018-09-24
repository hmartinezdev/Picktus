import Button from '@components/Button';
import FormError from '@components/FormError';
import Input from '@components/Input';
import colors from '@constants/colors';
import React, { ChangeEvent, PureComponent } from 'react';
import Transition from 'react-transition-group/Transition';
import { ISubscribeHandlerProps, ISubscribeHandlerState } from './SubscribeHander.type';
class SubscribeHandler extends PureComponent<ISubscribeHandlerProps, ISubscribeHandlerState> {
  constructor(props: ISubscribeHandlerProps) {
    super(props);

    this.state = {
      errorCount: 0,
      errors: {},
      inputs: {},
      open: false,
    };
  }

  private pushError = (key: string, error: string): void => {
    if (!this.state.errors[key]) {
      this.setState({
        errorCount: this.state.errorCount + 1,
        errors: { ...this.state.errors, [key]: error },
      });
    }
  };

  private removeError = (key: string): void => {
    if (this.state.errors[key]) {
      this.setState({
        errorCount: this.state.errorCount - 1,
        errors: { ...this.state.errors, [key]: '' },
      });
    }
  };

  public onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name !== 'open') {
      this.setState({ inputs: { ...this.state.inputs, [name]: value } });
    }
  };

  public validity(errorKey: string, valid: boolean, error: string) {
    if (valid) {
      this.removeError(errorKey);
      return valid;
    }

    this.pushError(errorKey, error);
    return valid;
  }

  public onSubscribeClick = () => {
    const { password, comfirmPassword, mail } = this.state.inputs;
    const { userCreation } = this.props;

    const mailRegex = new RegExp( // tslint:disable-next-line
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    const passwordRegex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');

    if (
      !this.validity(
        'missingValue',
        Boolean(password && comfirmPassword && mail),
        'Every field is required to subscribe'
      )
    ) {
      return;
    }

    this.validity('comfirmPassword', comfirmPassword === password, 'Password comfirmation does not match password');
    this.validity('mail', !!mail.match(mailRegex), 'You must use a valid mail address');
    this.validity(
      'password',
      !!password.match(passwordRegex),
      'Password must be minimum eight characters,  at least one letter, one number and one special character'
    );

    if (!this.state.errorCount) {
      userCreation(mail, password);
    }
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
                <Input name="mail" placeholder="Mail" onChange={this.onChange} />
                <Input name="password" placeholder="Password" type="password" onChange={this.onChange} />
                <Input name="comfirmPassword" placeholder="Confirm password" type="password" onChange={this.onChange} />
                <Button text="Subscribe" onClick={this.onSubscribeClick} />
              </div>
              {Object.keys(this.state.errors).map((key) => {
                const value = this.state.errors[key];

                if (value) {
                  return <FormError key={key} text={value} />;
                }
              })}
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
            transform: scale3D(1.2, 1.2);
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
