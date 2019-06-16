import Button from '@components/Button';
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
  type?: string;
  defaultValue: string;
  current: number;
  onPreviousClick: () => void;
}

class SubscribeStep extends Component<ISubscribeStepPropsType, IStringMap> {
  public static defaultProps = {
    defaultValue: '',
    type: 'text',
  };

  constructor(props: ISubscribeStepPropsType) {
    super(props);
    const { name, defaultValue } = props;

    this.state = {
      [name]: defaultValue,
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

  public onNextClick = () => {
    this.onSubmit();
  };

  public onPreviousClick = () => {
    const { current, onPreviousClick } = this.props;
    if (current >= 1) {
      onPreviousClick();
    }
  };

  public render(): React.ReactElement<SubscribeStep> {
    const { name, title, type, defaultValue, current } = this.props;
    return (
      <div className="container">
        <Input
          name={name}
          onChange={this.onChange}
          autoFocus={true}
          placeholder={title}
          type={type}
          onEnter={this.onSubmit}
          defaultValue={defaultValue}
        />

        <div className="navigationButtons">
          <Button disabled={current < 1} onClick={this.onPreviousClick} text="previous" />
          <Button disabled={this.state[name] === ''} onClick={this.onNextClick} text="next" />
        </div>

        <style jsx>{`
          .container {
            font-family: ${fontFamily};
            color: ${colors.secondary};
          }

          :global(.navigationButtons.navigationButtons > button:nth-child(1)) {
            margin-right: 0.5rem;
          }

          :global(.navigationButtons.navigationButtons > button:nth-child(2)) {
            margin-left: 0.5rem;
          }

          .navigationButtons {
            width: 100%;
            display: flex;
            justify-content: space-around;
          }
        `}</style>
      </div>
    );
  }
}

export default SubscribeStep;
