import FormPagination from '@components/FormPagination/FormPagination';
import colors from '@constants/colors';
import { borderRadius, boxShadow } from '@constants/styles';
import React, { PureComponent } from 'react';
import { isMail, isPasswordSecure } from './controls';
import { ISubscribeHandlerProps, ISubscribeHandlerState, ISubscribeStepInfos } from './SubscribeHander.type';
import SubscribeStep from './SubscribeStep';

class SubscribeHandler extends PureComponent<ISubscribeHandlerProps, ISubscribeHandlerState> {
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
        errorMessage: 'You need a secured password',
        name: 'password',
        title: 'Password',
        type: 'password',
      },
      {
        control: this.confirmPassword,
        errorMessage: 'You need to user a valid email address',
        name: 'confirm',
        title: 'Confirmation',
        type: 'password',
      },
    ];
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

  public render(): React.ReactElement<SubscribeHandler> {
    return (
      <div className="container">
        <FormPagination
          current={this.state.current}
          steps={this.form.reduce((accumulator: string[], value) => [...accumulator, value.title], [])}
        />
        {this.form.filter((value, index) => index === this.state.current).map((value) => (
          <SubscribeStep
            key={value.name}
            onValidate={this.onValidate}
            control={value.control}
            errorMessage={value.errorMessage}
            name={value.name}
            title={value.title}
            type={value.type}
          />
        ))}

        <style jsx>{`
          .container {
            box-shadow: ${boxShadow};
            background-color: ${colors.primary};
            width: 30rem;
            padding: 1rem;
            box-sizing: border-box;
            border-radius: ${borderRadius};
          }
        `}</style>
      </div>
    );
  }
}

export default SubscribeHandler;
