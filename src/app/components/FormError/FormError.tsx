import ErrorSvg from '@assets/svg/error.svg';
import colors from '@constants/colors';
import React, { Component } from 'react';

export interface IFormErrorPropsType {
  text: string;
}
class FormError extends Component<IFormErrorPropsType> {
  public render(): React.ReactElement<FormError> {
    const { text } = this.props;

    return (
      <div className="container">
        <ErrorSvg className="icon" />
        <p>{text}</p>
        <style jsx>{`
          p {
            line-height: 1rem;
            margin-top: 0.2rem;
            box-sizing: border-box;
          }

          .container {
            display: flex;
            align-items: center;
            font-family: 'Josefin Sans', sans-serif;
            font-size: 0.7rem;
            color: ${colors.white};
            width: 100%;
            box-sizing: border-box;
            letter-spacing: 0.05rem;
            padding: 0.5rem 0rem 0.5rem 0.2rem;
            transition: 0.4s;
            outline: none;
            background-color: ${colors.error}cd;
            border-radius: 3px;
            margin: 0.8rem 0;
          }

          .icon {
            fill: ${colors.secondary};
            min-width: 1.8rem;
            margin-right: 0.2rem;
          }
        `}</style>
      </div>
    );
  }
}

export default FormError;
