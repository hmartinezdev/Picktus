import Button from '@components/Button';
import Input from '@components/Input';
import { PicktusMessageLevel } from '@store/reducers/message';
import React, { ChangeEvent, Component } from 'react';

export interface ISubscribeStepPropsType {
  onValidate: (value: string, key: string) => void;
  control: (param: any) => boolean;
  errorMessage: string;
  name: string;
  title: string;
  displaySnackBar: (message: string, level: PicktusMessageLevel) => void;
}

class SubscribeStep extends Component<ISubscribeStepPropsType, IStringMap> {
  constructor(props: ISubscribeStepPropsType) {
    super(props);
    const { name } = props;

    this.state = {
      [name]: '',
    };
  }

  public onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target;

    this.setState({ [name]: value });
  };

  public onSubmit = () => {
    const { name, onValidate, control, displaySnackBar, errorMessage } = this.props;
    const value = this.state[name];

    if (control(value)) {
      onValidate(value, name);
    } else {
      displaySnackBar(errorMessage, PicktusMessageLevel.ERROR);
    }
  };

  public render(): React.ReactElement<SubscribeStep> {
    const { name, title } = this.props;
    return (
      <div className="container">
        <h2>{title}</h2>
        <Input name={name} onChange={this.onChange} />
        <Button onClick={this.onSubmit} text="Next" />
      </div>
    );
  }
}

export default SubscribeStep;
