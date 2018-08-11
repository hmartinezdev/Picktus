import React, { Component } from 'react';
import colors from '@constants/colors';

class Logo extends Component {
  render() {
    return (
      <div className="logoContainer">
        <img className="logo" src="/static/logo.png" />
        <h1 className="title">
          <span className="first-letter">P</span> <span className="title-little">icktus</span>
        </h1>
        <style jsx>{`
          .title {
            margin-left: 1rem;
            color: ${colors.secondary};
            font-weight: 200;
            vertical-align: center;
            position: relative;
          }
          .first-letter {
            font-family: 'Nanum Pen Script', cursive;
            font-size: 12rem;
            line-height: 8rem;
            position: relative;
            top: 1.1rem;
          }
          .title-little {
            font-family: 'Josefin Sans', sans-serif;
            font-size: 7.5rem;
            margin-left: -0.7rem;
          }

          .logoContainer {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            box-sizing: border-box;
          }

          .logo {
            max-width: 150px;
          }
        `}</style>
      </div>
    );
  }
}

export default Logo;
