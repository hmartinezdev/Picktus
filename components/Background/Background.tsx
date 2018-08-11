import React, { Component } from 'react';

interface PropsType {
  children: JSX.Element[] | JSX.Element;
}

class Background extends Component<PropsType, {}> {
  render() {
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
            background: url('https://source.unsplash.com/collection/1922729/1920x1080') no-repeat center center fixed;
            background-size: cover;
          }
        `}</style>
      </div>
    );
  }
}

export default Background;
