import colors from '@constants/colors';
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

class Button extends Component<ITextSwitchButtonPropTypes, ITextSwitchButtonState> {
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

  public render(): React.ReactElement<Button> {
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
            font-size: 0.9rem;
            line-height: 2.5rem;
            background-color: ${colors.secondary}89;
            padding: 0 0.8rem;
            height: 2.3rem;
            font-family: 'Josefin Sans', sans-serif;
            color: ${colors.primary};
            border-radius: 3px;
            margin-bottom: 0.8rem;
            transition: all ease-in 200ms;
            border: none;
            width: 100%;
            outline: none;
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }

          .button:hover {
            background-color: ${colors.secondary};
          }

          .button--active {
            background-color: ${colors.primary}89;
            color: ${colors.secondary};
          }

          .button--active:hover {
            background-color: ${colors.primary};
          }

          .text {
            position: absolute;
            margin: 0;
            padding: 0;
            left: 50%;
            top: 50%;
            transform: translate(-50%, 50%);
            width: 100%;
            cursor: pointer;
          }

          .text--exiting,
          .text--exited {
            transition: all 200ms ease-in;
            transform: translate(-50%, 100%);
          }

          .text--entering {
            animation: slidedown 200ms ease-in;
          }

          .text--entered {
            transform: translate(-50%, -50%);
          }

          @keyframes slidedown {
            0% {
              transform: translate(-50%, -150%);
            }

            100% {
              transform: translate(-50%, -50%);
            }
          }
        `}</style>
      </button>
    );
  }
}

export default Button;
