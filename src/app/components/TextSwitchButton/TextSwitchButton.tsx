import colors from '@constants/colors';
import { borderRadius, fontFamily } from '@constants/styles';
import React, { Component } from 'react';
import { Transition } from 'react-transition-group';

export interface ITextSwitchButtonPropTypes {
  activeText: string;
  initialText: string;
  onClick(): void;
}

export interface ITextSwitchButtonState {
  active: boolean;
}

class TextSwitchButton extends Component<ITextSwitchButtonPropTypes, ITextSwitchButtonState> {
  public static defaultProps = {
    activeText: '',
    initialText: '',
  };

  public constructor(props: ITextSwitchButtonPropTypes) {
    super(props);

    this.state = {
      active: false,
    };
  }

  public onClick = (): void => {
    this.setState({ active: !this.state.active });
    this.props.onClick();
  };

  public render(): React.ReactElement<TextSwitchButton> {
    const { initialText, activeText } = this.props;
    const { active } = this.state;

    return (
      <button onClick={this.onClick} className={`button ${active ? 'button--active' : ''}`}>
        <Transition key="initial" timeout={200} in={!active} mountOnEnter={true} unmountOnExit={true}>
          {(status) => <p className={`text text--${status}`}>{initialText}</p>}
        </Transition>
        <Transition key="active" timeout={200} in={active} mountOnEnter={true} unmountOnExit={true}>
          {(status) => <p className={`text text--${status}`}>{activeText}</p>}
        </Transition>
        <style jsx>{`
          .button {
            display: flex;
            justify-content: center;
            align-items: center;
            color: ${colors.primary};
            transition: all 0.5s;
            position: relative;
            text-align: center;
            cursor: pointer;
            font-family: ${fontFamily};
            border-radius: ${borderRadius};
            padding: 0 0.7rem;
            width: 100%;
            height: 2.35rem;
            margin-top: 0.8rem;
            background: none;
            border: none;
            outline: none;
          }

          .button:hover {
            color: ${colors.secondary};
          }

          .button::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: ${colors.secondary};
            transition-property: transform, opacity;
            transition: 0.3s ease-out;
            border-radius: ${borderRadius};
            cursor: pointer;
          }

          .button:hover::before {
            opacity: 0;
            transform: scale(0.5, 0.5);
          }

          .button::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            opacity: 0;
            transition-property: transform, opacity;
            transition: 0.3s ease-out;
            transform: scale(0.7, 0.7);
            background-color: ${colors.primary};
            border-radius: ${borderRadius};
            cursor: pointer;
          }

          .button:hover::after {
            opacity: 1;
            transform: scale(1, 1);
            z-index: 1;
          }

          .text {
            font-size: 0.9rem;
            position: absolute;
            margin: 0;
            padding: 0;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            cursor: pointer;
            z-index: 2;
          }

          .text--exiting,
          .text--exited {
            opacity: 0;
          }

          .text--entering {
            animation: fadeIn 200ms ease-in;
          }

          .text--entered {
            opacity: 1;
          }

          @keyframes fadeIn {
            0% {
              opacity: 0;
            }

            100% {
              opacity: 1;
            }
          }
        `}</style>
      </button>
    );
  }
}

export default TextSwitchButton;
