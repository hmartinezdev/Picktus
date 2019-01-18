import React, { PureComponent } from 'react';
import { isMail } from './controls';
import { ISubscribeHandlerProps } from './SubscribeHander.type';
import SubscribeStep from './SubscribeStep';

class SubscribeHandler extends PureComponent<ISubscribeHandlerProps, IStringMap> {
  constructor(props: ISubscribeHandlerProps) {
    super(props);

    this.state = {};
  }
  public onValidate = (value: string, key: string): void => {
    this.setState({ [key]: value });
  };

  public onSubscribeClick = (): void => {
    const { userCreation } = this.props;
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
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}</style>
      </div>
    );
  }
}

export default SubscribeHandler;
