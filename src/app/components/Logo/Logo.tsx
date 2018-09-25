import Picktus from '@assets/svg/picktus.svg';
import colors from '@constants/colors';
import React, { Component } from 'react';

class Logo extends Component {
  public render(): React.ReactElement<Logo> {
    return (
      <div className="logoContainer">
        <Picktus className="logo" />
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
            font-family: 'Josefin Sans', sans-serif;
          }

          .logoContainer {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1.7rem 1rem 1.7rem 0.8rem;
            box-sizing: border-box;
          }

          .logo {
            width: 50%;
            height: 50%;
          }
        `}</style>
      </div>
    );
  }
}

export default Logo;
