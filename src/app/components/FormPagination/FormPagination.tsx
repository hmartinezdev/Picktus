import ValidatedSvg from '@assets/svg/validated.svg';
import colors from '@constants/colors';
import { borderRadius, fontFamily } from '@constants/styles';
import React, { Component } from 'react';
import { Transition } from 'react-transition-group';

export interface IFormPaginationPropTypes {
  steps: string[];
  current: number;
}

class FormPagination extends Component<IFormPaginationPropTypes> {
  public static defaultProps = {
    current: 1,
  };

  public render(): React.ReactElement<FormPagination> {
    const { steps, current } = this.props;
    return (
      <div className="formPagination">
        {steps.map((step, index) => {
          const ret = [];
          const stepClassName = ['step'];

          if (current >= index) {
            stepClassName.push('step--active');
          }

          ret.push(
            <div className={stepClassName.join(' ')} key={step}>
              <Transition timeout={200} in={current > index} mountOnEnter unmountOnExit>
                {(status) => <ValidatedSvg className={`validated validated--${status}`} />}
              </Transition>
              <div className="tag">{step}</div>
            </div>
          );

          if (index !== steps.length - 1) {
            ret.push(
              <div className={`separator ${current > index ? 'separator--active' : ''}`} key={`${step}-separator`} />
            );
          }

          return ret;
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
            display: flex;
            justify-content: center;
            align-items: center;
            width: 1.8rem;
            height: 1.8rem;
            border: 3px solid ${colors.white};
            border-radius: ${borderRadius};
            display: inline-block;
            transition: all 0.3s;
            position: relative;
            transition: border 200ms ease-in;
          }

          .step--active {
            border-color: ${colors.secondary};
          }

          .separator {
            width: 30%;
            height: 3px;
            display: inline-block;
            background-color: ${colors.white};
            transition: border 200ms ease-in;
          }

          .separator--active {
            background-color: ${colors.secondary};
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
            font-size: 0.9rem;
          }

          .validated {
            opacity: 0;
            width: 1.8rem;
            height: 1.8rem;
            transition: opacity 200ms ease-in;
          }

          .validated--entered,
          .validated--entering {
            opacity: 1;
          }
        `}</style>
      </div>
    );
  }
}

export default FormPagination;
