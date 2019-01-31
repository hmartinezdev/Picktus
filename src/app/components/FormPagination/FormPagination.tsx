import colors from '@constants/colors';
import { borderRadius, fontFamily } from '@constants/styles';
import React, { Component } from 'react';

export interface IFormPaginationPropTypes {
  steps: string[];
  current: number;
}

class FormPagination extends Component<IFormPaginationPropTypes> {
  public static defaultProps = {
    current: 0,
  };

  public render(): React.ReactElement<FormPagination> {
    const { steps } = this.props;
    return (
      <div className="formPagination">
        {steps.map((step, index) => {
          if (index === steps.length - 1) {
            return (
              <div className="step" key={step}>
                <div className="tag">{step}</div>
              </div>
            );
          }
          return [
            <div className="step" key={step}>
              <div className="tag">{step}</div>
            </div>,
            <div className="separator" key={`${step}-separator`} />,
          ];
        })}

        <style jsx>{`
          .formPagination {
            max-width: 900px;
            width: 100%;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 85px;
          }

          .step {
            width: 25px;
            height: 25px;
            border: 3px solid ${colors.blue};
            border-radius: ${borderRadius};
            display: inline-block;
            transition: all 0.3s;
            position: relative;
          }

          .separator {
            width: ${100 / steps.length}%;
            height: 3px;
            display: inline-block;
            background-color: ${colors.blue};
          }

          .tag {
            font-family: ${fontFamily};
            position: absolute;
            top: -30px;
            left: 50%;
            -webkit-transform: translateX(-50%);
            transform: translateX(-50%);
            color: ${colors.secondary};
            white-space: nowrap;
          }
        `}</style>
      </div>
    );
  }
}

export default FormPagination;
