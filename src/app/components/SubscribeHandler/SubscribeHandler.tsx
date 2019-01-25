import { boxShadow } from '@constants/styles';
import React, { PureComponent } from 'react';
import { isMail, isPasswordSecure } from './controls';
import { ISubscribeHandlerProps, ISubscribeStepInfos } from './SubscribeHander.type';
import SubscribeStep from './SubscribeStep';

class SubscribeHandler extends PureComponent<ISubscribeHandlerProps, IStringMap> {
  private form: ISubscribeStepInfos[] = [
    {
      control: isMail,
      errorMessage: 'You need to user a valid email address',
      name: 'mail',
      title: 'Email address',
    },
    {
      control: isPasswordSecure,
      errorMessage: 'You need a secured password',
      name: 'password',
      title: 'Email address',
    },
    {
      control: isMail,
      errorMessage: 'You need to user a valid email address',
      name: 'mail',
      title: 'Email address',
    },
  ];

  constructor(props: ISubscribeHandlerProps) {
    super(props);
    this.state = {};
  }

  public confirmPassword = (passwordConfirmation: string): boolean => passwordConfirmation === this.state.password;

  public onValidate = (value: string, key: string): void => {
    this.setState({ [key]: value });
  };

  public onLastValueSubmitted = (): void => {
    const { userCreation } = this.props;

    userCreation(this.state.mail, this.state.password);
  };

  public render(): React.ReactElement<SubscribeHandler> {
    return (
      <div className="container">
        <SubscribeStep
          onValidate={this.onValidate}
          control={isMail}
          errorMessage="You need to user a valid email address"
          name="mail"
          title="Email address"
        />
        <style jsx>{`
          .container {
            box-shadow: ${boxShadow};
          }
        `}</style>
      </div>
    );
  }
}

export default SubscribeHandler;
