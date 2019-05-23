import Input from '@components/Input';
import colors from '@constants/colors';
import { fontFamily } from '@constants/styles';
import { PicktusMessageLevel } from '@store/reducers/message';
import React, { ChangeEvent, Component } from 'react';

export interface ISubscribeStepPropsType {
  onValidate: (value: string, key: string) => void;
  control: (param: any) => boolean;
  errorMessage: string;
  name: string;
  title: string;
  displaySnackBar: (message: string, level: PicktusMessageLevel) => void;
  type: string;
}

class SubscribeStep extends Component<ISubscribeStepPropsType, IStringMap> {
  public static defaultProps = {
    type: 'text',
  };

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
    const { name, title, type } = this.props;
    return (
      <div className="container">
        <Input
          name={name}
          onChange={this.onChange}
          autoFocus={true}
          placeholder={title}
          type={type}
          onEnter={this.onSubmit}
        />

        <style jsx>{`
          .container {
            font-family: ${fontFamily};
            color: ${colors.secondary};
          }
        `}</style>
      </div>
    );
  }
}

export default SubscribeStep;
