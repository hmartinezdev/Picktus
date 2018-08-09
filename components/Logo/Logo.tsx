import React, { Component } from 'react';
import colors from '../../constants/colors';

class Logo extends Component {
  render() {
    return (
      <div className="logoContainer">
        <img className="logo" src="/static/logo.png" />
        <h1 className="title">Picktus</h1>
        <style jsx>{`
          .title {
            font-family: 'Caveat', cursive;
            font-size: 10rem;
            margin-left: 1rem;
            color: ${colors.secondary};
          }

          .logoContainer {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
          }
          .logo {
            width: 200px;
          }
        `}</style>
      </div>
    );
  }
}

export default Logo;
