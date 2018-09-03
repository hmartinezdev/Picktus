import colors from '@constants/colors';
import React, { ChangeEvent, Component } from 'react';

export interface InputPropTypes {
  type?: string;
  placeholder?: string;
  onChange(e: ChangeEvent<HTMLInputElement>): void;
  name?: string;
}
class Input extends Component<InputPropTypes> {
  public static defaultProps = {
    name: '',
    placeholder: '',
    type: 'text',
  };

  public render(): React.ReactElement<Input> {
    const { placeholder, type, onChange, name } = this.props;
    return (
      <div className="container">
        <input name={name} className="input" type={type} placeholder={placeholder} onChange={onChange} />
        <span className="focus-border">
          <i />
        </span>
        <style jsx>{`
          .container {
            position: relative;
            width: 75%;
            margin: 0.7rem 0;
          }

          .input {
            font-family: 'Josefin Sans', sans-serif;
            font-size: 0.75rem;
            color: ${colors.secondary};
            width: 100%;
            box-sizing: border-box;
            letter-spacing: 1px;
            border: 1px solid ${colors.secondary};
            padding: 0.8rem 0.7rem 0.8rem;
            transition: 0.4s;
            outline: none;
            background-color: ${colors.primary}00;
            border-radius: 3px;
          }

          .input::placeholder {
            color: ${colors.secondary}bb;
          }

          .input ~ .focus-border:before,
          .input ~ .focus-border:after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 0;
            height: 2px;
            background-color: ${colors.secondary};
            transition: 0.3s ease-out;
          }

          .input ~ .focus-border:after {
            top: auto;
            bottom: 0;
            left: auto;
            right: 0;
          }
          .input ~ .focus-border i:before,
          .input ~ .focus-border i:after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 2px;
            height: 0;
            background-color: ${colors.secondary};
            transition: 0.3s ease-out;
          }
          .input ~ .focus-border i:after {
            left: auto;
            right: 0;
            top: auto;
            bottom: 0;
          }
          .input:focus ~ .focus-border:before,
          .input:focus ~ .focus-border:after {
            width: 100%;
            transition: 0.3s ease-out;
          }
          .input:focus ~ .focus-border i:before,
          .input:focus ~ .focus-border i:after {
            height: 100%;
            transition: 0.3s ease-out;
          }
        `}</style>
      </div>
    );
  }
}

export default Input;
