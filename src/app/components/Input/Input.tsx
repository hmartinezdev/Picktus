import colors from '@constants/colors';
import React, { Component } from 'react';

interface PropTypes {
  type?: string;
  placeholder: string;
}
class Input extends Component<PropTypes> {
  private static defaultProps = {
    placeholder: '',
    type: 'text',
  };

  public render(): React.ReactElement<Input> {
    const { placeholder, type } = this.props;
    return (
      <div className="container">
        <input className="input" type={type} placeholder={placeholder} />
        <span className="focus-border">
          <i />
        </span>
        <style jsx>{`
          .container {
            position: relative;
            width: 75%;
            margin: 0.5rem 0;
            border-radius: 3px;
          }

          .input {
            font-family: 'Josefin Sans', sans-serif;
            font-size: 0.9rem;
            color: ${colors.secondary};
            width: 100%;
            box-sizing: border-box;
            letter-spacing: 1px;
            border: 1px solid ${colors.secondary};
            padding: 0.9rem 0.8rem 0.9rem;
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
            height: 3px;
            background-color: ${colors.secondary};
            transition: 0.3s;
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
            width: 3px;
            height: 0;
            background-color: ${colors.secondary};
            transition: 0.4s;
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
            transition: 0.3s;
          }
          .input:focus ~ .focus-border i:before,
          .input:focus ~ .focus-border i:after {
            height: 100%;
            transition: 0.4s;
          }
        `}</style>
      </div>
    );
  }
}

export default Input;
