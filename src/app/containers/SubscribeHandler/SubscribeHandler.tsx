import ButtonLink from '@components/ButtonLink';
import FormPagination from '@components/FormPagination/FormPagination';
import Loader from '@components/Loader';
import colors from '@constants/colors';
import { borderRadius, boxShadow } from '@constants/styles';
import React, { PureComponent } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';
import { isMail, isPasswordSecure } from './controls';
import { ISubscribeHandlerProps, ISubscribeHandlerState, ISubscribeStepInfos } from './SubscribeHandler.type';
import SubscribeStepConnected from './SubscribeStep';

class SubscribeHandler extends PureComponent<ISubscribeHandlerProps, ISubscribeHandlerState> {
  public static defaultProps = {
    requestStatus: null,
  };

  public form: ISubscribeStepInfos[] = [];

  constructor(props: ISubscribeHandlerProps) {
    super(props);
    this.state = { current: 0, values: {} };

    this.form = [
      {
        control: isMail,
        errorMessage: 'You need to user a valid email address',
        name: 'mail',
        title: 'Email address',
        type: 'text',
      },
      {
        control: isPasswordSecure,
        errorMessage:
          'Password must be minimum eight characters,  at least one letter, one number and one special character',
        name: 'password',
        title: 'Password',
        type: 'password',
      },
      {
        control: this.confirmPassword,
        errorMessage: 'The password confirmation must be identical to the password',
        name: 'confirm',
        title: 'Password confirmation',
        type: 'password',
      },
    ];
  }

  public componentWillReceiveProps(nextProps: ISubscribeHandlerProps) {
    const { requestStatus } = this.props;
    const nextRequestStatus = nextProps.requestStatus;
    if (requestStatus && nextRequestStatus) {
      if (requestStatus.inProgress && !nextRequestStatus.inProgress) {
        this.setState({ current: 0 });
      }
    }
  }

  public confirmPassword = (passwordConfirmation: string): boolean =>
    passwordConfirmation === this.state.values.password;

  public onValidate = (value: string): void => {
    if (this.state.current === this.form.length - 1) {
      this.onLastValueSubmitted();
    }

    this.setState({
      current: this.state.current + 1,
      values: { ...this.state.values, [this.form[this.state.current].name]: value },
    });
  };

  public onLastValueSubmitted = (): void => {
    const { userCreation } = this.props;

    userCreation(this.state.values.mail, this.state.values.password);
  };

  public onValidatedStepClick = (step: number): void => {
    this.setState({ current: step });
  };

  public onPreviousClick = () => {
    const { current } = this.state;
    if (current > 0) {
      this.setState({ current: current - 1 });
    }
  };

  public render(): React.ReactElement<SubscribeHandler> {
    const currentStep = this.form[this.state.current];
    return (
      <div className="container">
        <div className="formContainer">
          {' '}
          <FormPagination
            current={this.state.current}
            steps={this.form.reduce((accumulator: string[], value) => [...accumulator, value.title], [])}
            onValidatedStepClick={this.onValidatedStepClick}
          />
          <div className="form">
            <TransitionGroup component={null}>
              {this.state.current <= this.form.length - 1 ? (
                this.form
                  .filter((_value, index) => index === this.state.current)
                  .map((value) => (
                    <Transition timeout={300} key={`${value.name}-container`} mountOnEnter unmountOnExit in appear>
                      {(status: string) => (
                        <div key={value.name} className={`stepContainer stepContainer--${status}`}>
                          <SubscribeStepConnected
                            onValidate={this.onValidate}
                            control={value.control}
                            errorMessage={value.errorMessage}
                            name={value.name}
                            title={value.title}
                            type={value.type}
                            defaultValue={currentStep ? this.state.values[currentStep.name] : ''}
                            current={this.state.current}
                            onPreviousClick={this.onPreviousClick}
                          />
                        </div>
                      )}
                    </Transition>
                  ))[0]
              ) : (
                <Transition timeout={300} key={'loader-container'} mountOnEnter unmountOnExit in appear>
                  {(status: string) => (
                    <div key="loader" className={`stepContainer stepContainer--${status}`}>
                      <Loader />
                    </div>
                  )}
                </Transition>
              )}
            </TransitionGroup>
          </div>
        </div>

        <ButtonLink prefetch={true} text="I have an account!" href="/auth/login" dark />
        <style jsx>{`
          .formContainer {
            box-shadow: ${boxShadow};
            background-color: ${colors.primary};
            width: 24rem;
            padding: 0.7rem;
            box-sizing: border-box;
            border-radius: ${borderRadius};
            display: flex;
            align-items: center;
            flex-direction: column;
            height: 16rem;
          }

          .stepContainer {
            opacity: 0;
            transition: opacity 300ms ease-in;
            width: 100%;
            height: 100%;
          }

          .stepContainer--entered,
          .stepContainer--entering {
            opacity: 1;
          }

          .stepContainer--exiting,
          .stepContainer--exited {
            position: absolute;
          }

          .form {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 16rem;
            position: relative;
          }

          .inputTransition {
            width: 100%;
          }
        `}</style>
      </div>
    );
  }
}

export default SubscribeHandler;
