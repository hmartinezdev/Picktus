import colors from '@constants/colors';
import React, { Component } from 'react';

interface IBackgroundPropsType {
  children: JSX.Element[] | JSX.Element;
}

class Background extends Component<IBackgroundPropsType, {}> {
  public render(): React.ReactElement<Background> {
    const { children } = this.props;

    return (
      <div className="background">
        {children}
        <style jsx>{`
          .background {
            display: flex;
            align-self: stretch;
            overflow: hidden;
            min-height: 100vh;
            width: 100%;
            background: url('/static/background.svg') no-repeat center center fixed;
            background-size: cover;
            position: relative;
          }

          .background:before {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: ${colors.primary}80;
            content: '';
          }
        `}</style>
      </div>
    );
  }
}

export default Background;
