import Input from '@components/Input';
import colors from '@constants/colors';
import { borderRadius, fontFamily } from '@constants/styles';
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
  private input: Input | null = null;

  constructor(props: ISubscribeStepPropsType) {
    super(props);
    const { name } = props;

    this.state = {
      [name]: '',
    };
  }

  public componentDidMount() {
    if (this.input && this.input.input) {
      this.input.input.addEventListener('keyup', (ev: KeyboardEvent) => {
        if (ev.keyCode === 13) {
          this.onSubmit();
        }
      });
    }
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
        <Input
          ref={(node) => (this.input = node)}
          name={name}
          onChange={this.onChange}
          autoFocus={true}
          placeholder={title}
        />

        <style jsx>{`
          .container {
            font-family: ${fontFamily};
            color: ${colors.secondary};
            background-color: ${colors.primary};
            width: 20rem;
            padding: 1rem;
            box-sizing: border-box;
            border-radius: ${borderRadius};
          }
        `}</style>
      </div>
    );
  }
}

export default SubscribeStep;
