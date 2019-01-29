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
        {steps.map((step) => (
          <div className="step" key={step}>
            <div className="tag">{step}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default FormPagination;
