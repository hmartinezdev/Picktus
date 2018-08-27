import colors from '@constants/colors';
import React, { Component } from 'react';

class SubscribeHandler extends Component {
  public render(): React.ReactElement<SubscribeHandler> {
    return (
      <div className="container">
        <h1 className="text">It's my first time here!</h1>
        <style jsx>{`
          .text {
            font-size: 0.9rem;
          }

          .container {
            background-color: ${colors.primary}cd;
            padding: 0.9rem 0.8rem 0.9rem;
            position: relative;
            font-family: 'Josefin Sans', sans-serif;
            color: ${colors.secondary};
            border-radius: 3px;
          }
        `}</style>
      </div>
    );
  }
}

export default SubscribeHandler;
