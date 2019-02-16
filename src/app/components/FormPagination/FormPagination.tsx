import ValidatedSvg from '@assets/svg/validated.svg';
import colors from '@constants/colors';
import { borderRadius, fontFamily } from '@constants/styles';
import classnames from 'classnames';
import React, { Component } from 'react';
import { Transition } from 'react-transition-group';

export interface IFormPaginationPropTypes {
  steps: string[];
  current: number;
  onValidatedStepClick: (step: number) => void;
}

class FormPagination extends Component<IFormPaginationPropTypes> {
  public static defaultProps = {
    current: 0,
  };

  public render(): React.ReactElement<FormPagination> {
    const { steps, current, onValidatedStepClick } = this.props;
    return (
      <div className="formPagination">
        {steps.map((step, index) => {
          const validated = current > index;
          const active = current >= index;
          const onClick = () => {
            onValidatedStepClick(index);
          };
          const ret = [];

          ret.push(
            <div className="stepContainer" onClick={validated ? onClick : undefined} key={step}>
              <div
                className={classnames('step', {
                  ['step--active']: active,
                  ['step--validated']: validated,
                })}
              >
                <Transition timeout={200} in={current > index} mountOnEnter unmountOnExit>
                  {(status) => <ValidatedSvg className={`validated validated--${status}`} />}
                </Transition>
              </div>
              <div
                className={classnames('tag', {
                  ['tag--active']: active,
                  ['tag--validated']: validated,
                })}
              >
                {step}
              </div>
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
            height: 6.5rem;
          }

          .stepContainer {
            position: relative;
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
            transition: all 200ms ease-in;
            overflow: hidden;
          }

          .step--active {
            border-color: ${colors.secondary};
          }

          .step--validated:hover {
            transform: scale(1.3, 1.3);
            cursor: pointer;
          }

          .separator {
            width: 20%;
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
            top: -1.8rem;
            left: 50%;
            -webkit-transform: translateX(-50%);
            transform: translateX(-50%);
            color: ${colors.secondary};
            white-space: nowrap;
            font-size: 0.9rem;
            transform: translate(-50%, 0.6rem) scale(0.6, 0.6);
            transition: all 200ms ease-in;
            opacity: 1;
          }

          .tag--active {
            transform: translate(-50%, 0) scale(1, 1);
          }

          .tag--validated {
            transform: translate(-50%, 0.6rem) scale(0.6, 0.6);
          }

          .step--validated:hover + .tag--validated {
            transform: translate(-50%, 0) scale(1, 1);
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
