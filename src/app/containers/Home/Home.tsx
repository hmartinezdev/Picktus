import ToolBar from '@containers/ToolBar';
import React, { Component } from 'react';

export interface IHomePropsType {
  status: string;
}

class Home extends Component {
  public render(): React.ReactElement<Home> {
    return (
      <div className="container">
        <div className="toolbarContainer">
          <ToolBar />
        </div>
        <style jsx>{`
          .container {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100vh;
            display: flex;
            align-items: center;
            flex-direction: column;
            box-sizing: border-box;
            overflow: auto;
            opacity: 1;
            align-items: flex-start;
          }

          .container--exiting,
          .container--exited {
            position: absolute;
            opacity: 0;
          }

          .toolbarContainer {
          }
        `}</style>
      </div>
    );
  }
}

export default Home;
