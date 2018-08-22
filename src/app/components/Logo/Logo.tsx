import colors from '@constants/colors';
import React, { Component } from 'react';

class Logo extends Component {
  public render(): React.ReactElement<Logo> {
    return (
      <div className="logoContainer">
        <img className="logo" src="/static/logo.png" />
        <h1 className="title">Picktus</h1>
        <style jsx>{`
          .title {
            margin-left: 1rem;
            color: ${colors.secondary};
            font-weight: 200;
            vertical-align: center;
            position: relative;
            top: 1rem;
            font-family: 'Caveat', cursive;
            font-size: 6.5rem;
            line-height: 8rem;
            font-family: 'Josefin Sans', sans-serif;
            padding: 1.7rem 0;
          }

          .logoContainer {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            box-sizing: border-box;
          }

          .logo {
            max-width: 130px;
          }
        `}</style>
      </div>
    );
  }
}

export default Logo;
