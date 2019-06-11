import Logo from '@components/Logo';
import colors from '@constants/colors';
import { borderRadius, boxShadow } from '@constants/styles';
import React, { Component } from 'react';

export interface IAuthenticationPropsType {
  status: string;
  children: JSX.Element;
}

class Authentication extends Component<IAuthenticationPropsType> {
  public render(): React.ReactElement<Authentication> {
    const { status, children } = this.props;

    return (
      <div className={`container container--${status}`}>
        <div className={`logo logo--${status}`}>
          <Logo />
        </div>
        <div className="content">
          <div className={`contentContainer contentContainer--${status}`}>{children}</div>
        </div>

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
              transform: translateX(0%);
              transition: all 300ms ease-out;
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
              transform: translateX(100%);
            }

            .logo {
              background-color: ${colors.primary};
              box-shadow: ${boxShadow};
              display: flex;
              position: relative;
              border-radius: ${borderRadius};
              transition: opacity 300ms ease-out;
            }

            .logo--exiting {
              box-shadow: initial;
            }

            .content {
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
                transform: translateX(-100%);
              }

              100% {
                opacity: 1;
                transform: translateX(0);
              }
            }
          `}
        </style>
      </div>
    );
  }
}

export default Authentication;
