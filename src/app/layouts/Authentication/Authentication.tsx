import Logo from '@components/Logo';
import colors from '@constants/colors';
import { borderRadius, boxShadow } from '@constants/styles';
import React, { Component } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';

export interface IAuthenticationPropsType {
  status: string;
  children: JSX.Element;
}

class Authentication extends Component<IAuthenticationPropsType> {
  public render(): React.ReactElement<Authentication> {
    const { status, children } = this.props;

    return (
      <div className={`container container--${status}`}>
        <div className={`logo`}>
          <Logo />
        </div>
        <TransitionGroup className="authentication__content" appear={true}>
          {React.Children.map(children, (child: JSX.Element) => (
            <Transition key={child.key || ''} timeout={300} mountOnEnter={true} unmountOnExit={true} appear={true}>
              {(contentStatus) => <div className={`contentContainer contentContainer--${contentStatus}`}>{child}</div>}
            </Transition>
          ))}
        </TransitionGroup>
        <style jsx>
          {`
            .container {
              width: 100%;
              height: 100vh;
              display: flex;
              align-items: center;
              flex-direction: column;
              padding: 2rem 0;
              box-sizing: border-box;
              overflow: hidden;
              opacity: 1;
              transition: opacity 300ms ease-out;
            }

            .container--exiting,
            .container--exited {
              position: absolute;
              z-index: 0;
            }

            .contentContainer {
              transition: opacity 300ms ease-out;
            }

            .contentContainer--entering {
              animation: opacity 300ms ease-in;
            }

            .contentContainer--entered {
              opacity: 1;
            }

            .contentContainer--exiting,
            .contentContainer--exited {
              position: absolute;
              opacity: 0;
            }

            .logo {
              background-color: ${colors.primary};
              box-shadow: ${boxShadow};
              display: flex;
              position: relative;
              border-radius: ${borderRadius};
              transition: opacity 300ms ease-out;
            }

            :global(.authentication__content) {
              height: 100%;
              width: 100%;
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              align-items: center;
              margin-top: 2.5rem;
            }

            @keyframes opacity {
              0% {
                opacity: 0;
              }

              100% {
                opacity: 1;
              }
            }
          `}
        </style>
      </div>
    );
  }
}

export default Authentication;
