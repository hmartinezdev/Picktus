import Loader from '@components/Loader';
import colors from '@constants/colors';
import React, { Component } from 'react';

class Header extends Component {
  public render(): React.ReactElement<Header> {
    return (
      <div className="container">
        <div className="loaderContainer">
          <Loader />
        </div>

        <style jsx>{`
          .container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 8rem;
            height: 8rem;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate3D(-50%, -50%, 0);
            z-index: 1000;
            width: 100%;
            min-height: 100%;
            background-color: ${colors.primary}cd;
          }

          .loaderContainer {
            width: 10rem;
            height: 10rem;
          }
        `}</style>
      </div>
    );
  }
}

export default Header;
