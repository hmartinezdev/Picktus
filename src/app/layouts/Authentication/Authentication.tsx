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
        <div className={`content content--${status}`}>{children}</div>
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

            .logo {
              background-color: ${colors.primary};
              box-shadow: ${boxShadow};
              display: flex;
              position: relative;
              border-radius: ${borderRadius};
              transition: opacity 300ms ease-out;
            }

            .logo--exiting,
            .logo--exited {
              opacity: 0;
            }

            .content {
              height: 100%;
              width: 100%;
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              align-items: center;
              margin-top: 2.5rem;
              opacity: 1;
              transition: opacity 130ms ease-out;
            }

            .content--exiting,
            .content--exited {
              opacity: 0;
            }
          `}
        </style>
      </div>
    );
  }
}

export default Authentication;
