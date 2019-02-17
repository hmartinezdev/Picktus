import React, { Component } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';
import SnackBar from '../SnackBar';
import { ISnackBarHandlerProps } from './SnackBarHandler.type';

class SnackBarHandler extends Component<ISnackBarHandlerProps> {
  public static defaultProps = {
    snackbars: [],
  };

  constructor(props: ISnackBarHandlerProps) {
    super(props);
  }

  private dismissSnackBar() {
    const { snackbars, dismissSnackBar } = this.props;
    if (snackbars.length > 0) {
      setTimeout(dismissSnackBar, 2000);
    }
  }

  public componentDidMount() {
    this.dismissSnackBar();
  }

  public componentDidUpdate(prevProps: ISnackBarHandlerProps) {
    const currentSnackBar = this.props.snackbars[0];
    const previousSnackBar = prevProps.snackbars[0];

    if (!currentSnackBar) {
      return;
    }

    if (!previousSnackBar || previousSnackBar.id !== currentSnackBar.id) {
      this.dismissSnackBar();
    }
  }

  public render(): React.ReactElement<SnackBarHandler> {
    const { snackbars } = this.props;

    return (
      <div>
        <TransitionGroup className="snackbars" appear={true}>
          {snackbars.map((value, key) => {
            if (key === 0) {
              return (
                <Transition key={value.id} timeout={700} mountOnEnter={true} unmountOnExit={true}>
                  {(status) => (
                    <div key={value.id} className={`snackbar__container snackbar__container--${status}`}>
                      <SnackBar text={value.text} level={value.level} />
                    </div>
                  )}
                </Transition>
              );
            }
          })}
        </TransitionGroup>
        <style jsx>{`
          .snackbar__container {
            position: absolute;
            bottom: 0px;
            left: 50%;
            transition: all 350ms ease-out;
            transform: translate(-50%, 120%);
            z-index: 1000;
            width: 90%;
          }

          .snackbar__container--entering {
            animation: slideUp 700ms ease-out;
          }

          .snackbar__container--entered {
            transform: translate(-50%, 0%);
          }

          .snackbar__container--entered,
          .snackbar__container--entering {
            z-index: 2;
          }

          .snackbar__container--exiting,
          .snackbar__container--exited {
            transform: translate(-50%, 120%);
            z-index: 1;
          }

          @keyframes slideUp {
            from {
              transform: translate(-50%, 120%);
            }

            to {
              transform: translate(-50%, 0%);
            }
          }
        `}</style>
      </div>
    );
  }
}

export default SnackBarHandler;
