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
            min-height: 100vh;
            width: 100%;
            background: url('/static/background.svg') no-repeat center center fixed;
            background-size: cover;
          }
        `}</style>
      </div>
    );
  }
}

export default Background;
