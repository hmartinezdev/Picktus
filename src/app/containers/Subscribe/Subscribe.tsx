import Logo from '@components/Logo';
import SubscribeHandler from '@components/SubscribeHandler';
import colors from '@constants/colors';
import { borderRadius, boxShadow } from '@constants/styles';
import React, { Component } from 'react';

class Subscribe extends Component {
  public render(): React.ReactElement<Subscribe> {
    return (
      <div className="container">
        <div className="logo">
          <Logo />
        </div>
        <div className="form">
          <SubscribeHandler />
        </div>
        <style jsx>{`
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

          .logo {
            background-color: ${colors.primary};
            box-shadow: ${boxShadow};
            display: flex;
            position: relative;
            border-radius: ${borderRadius};
          }

          .form {
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
        `}</style>
      </div>
    );
  }
}

export default Subscribe;
