import Input from '@components/Input';
import React, { Component } from 'react';

export interface ISubscribeStepPropsType {
  onValidate: (param: string) => void;
  control: (param: any) => boolean;
  errorMessage: string;
  name: string;
  title: string;
}

class SubscribeStep extends Component<ISubscribeStepPropsType> {
  public render(): React.ReactElement<SubscribeStep> {
    const { name, errorMessage, control, onValidate, title } = this.props;
    return (
      <div className="container">
        <h2>{title}</h2>
        <Input name={name} />
        <div />
      </div>
    );
  }
}

export default SubscribeStep;
