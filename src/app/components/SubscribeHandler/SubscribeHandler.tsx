import Button from '@components/Button';
import FormError from '@components/FormError';
import Input from '@components/Input';
import TextSwitchButton from '@components/TextSwitchButton';
import colors from '@constants/colors';
import { borderRadius } from '@constants/styles';
import classnames from 'classnames';
import React, { ChangeEvent, PureComponent } from 'react';
import Transition from 'react-transition-group/Transition';
import { ISubscribeHandlerProps, ISubscribeHandlerState } from './SubscribeHander.type';
class SubscribeHandler extends PureComponent<ISubscribeHandlerProps, ISubscribeHandlerState> {
  constructor(props: ISubscribeHandlerProps) {
    super(props);

    this.state = {
      errors: {},
      inputs: {},
      open: false,
    };
  }
  public onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target;
    if (name !== 'open') {
      this.setState({ inputs: { ...this.state.inputs, [name]: value } });
    }
  };

  public onSubscribeClick = (): void => {
    const { userCreation } = this.props;
  };

  public onTriggerClick = (): void => {
    this.setState({ open: !this.state.open, errors: {} });
  };

  public renderErrors = (): Array<JSX.Element | undefined> => {
    return Object.keys(this.state.errors).map((key) => {
      const value = this.state.errors[key];

      if (value) {
        return <FormError key={key} text={value} />;
      }
    });
  };

  public render(): React.ReactElement<SubscribeHandler> {
    const { loading } = this.props;
    return (
      <div className="container">
        <TextSwitchButton
          initialText="You don't have an account?"
          activeText="I have an account!"
          onClick={this.onTriggerClick}
        />
        <Transition in={this.state.open} timeout={200} mountOnEnter={true} unmountOnExit={true}>
          {(state) => (
            <div
              className={classnames(`formContainer formContainer--${state}`, {
                'formContainer--loading': loading,
              })}
            >
              <div className="form">
                <Input name="mail" placeholder="Mail" onChange={this.onChange} />
                <Input name="password" placeholder="Password" type="password" onChange={this.onChange} />
                <Input name="comfirmPassword" placeholder="Confirm password" type="password" onChange={this.onChange} />
                <Button text="Subscribe" onClick={this.onSubscribeClick} />
              </div>
            </div>
          )}
        </Transition>
        <style jsx>{`
          .errorContainer {
            position: absolute;
            width: 100%;
          }

          .formContainer {
            left: 0;
            bottom: 3.3rem;
            position: absolute;
            width: 100%;
            z-index: 3;
            opacity: 0;
            transform: scale(1.2, 1.2);
          }

          .formContainer--loading::after {
            position: absolute;
          }

          .formContainer--entering {
            animation: fadein 200ms;
            opacity: 1;
            transform: scale(1, 1);
          }

          .formContainer--entered {
            opacity: 1;
            transform: scale(1, 1);
          }

          .formContainer--exiting,
          .formContainer--exited {
            transition: all 200ms ease-in;
            opacity: 0;
            transform: scale(1.2, 1.2);
          }

          .formContainer .form {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border-radius: ${borderRadius};
            min-height: calc(100% - 4.3rem);
            padding: 1.5rem 0;
            background-color: ${colors.primary};
          }

          @keyframes fadein {
            0% {
              opacity: 0;
              transform: scale(1.2, 1.2);
            }

            100% {
              opacity: 1;
              transform: scale(1, 1);
            }
          }
        `}</style>
      </div>
    );
  }
}

export default SubscribeHandler;
