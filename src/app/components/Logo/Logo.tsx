import SvgLogo from '@assets/svg/logo.svg';
import colors from '@constants/colors';
import { fontFamily } from '@constants/styles';
import React, { Component } from 'react';

class Logo extends Component {
  public render(): React.ReactElement<Logo> {
    return (
      <div className="logoContainer">
        <SvgLogo className="home_logo" />
        <h1 className="title">Picktus</h1>
        <style jsx>{`
          .title {
            margin-left: 1rem;
            color: ${colors.secondary};
            font-weight: 200;
            vertical-align: center;
            position: relative;
            top: 0.7rem;
            font-family: 'Caveat', cursive;
            font-size: 5rem;
            line-height: 4rem;
            font-family: ${fontFamily};
          }

          .logoContainer {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem 1rem 2rem 0.8rem;
            box-sizing: border-box;
          }

          :global(.home_logo) {
            width: 6rem;
            height: 6rem;
          }
        `}</style>
      </div>
    );
  }
}

export default Logo;
