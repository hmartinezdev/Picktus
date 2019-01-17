import React, { PureComponent } from 'react';
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
        <SubscribeStep onValidate={this.onValidate} />
        <style jsx>{``}</style>
      </div>
    );
  }
}

export default SubscribeHandler;
