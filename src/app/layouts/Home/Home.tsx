import colors from '@constants/colors';
import ToolBar from '@containers/ToolBar';
import React, { Component } from 'react';

export interface IHomePropsType {
  status: string;
}

class Home extends Component<IHomePropsType> {
  public render(): React.ReactElement<Home> {
    const { status } = this.props;

    return (
      <div className={`container container--${status}`}>
        <div className="toolbarContainer">
          <ToolBar />
        </div>
        <style jsx>{`
          .container {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
            box-sizing: border-box;
            overflow: auto;
            opacity: 1;
            align-items: flex-start;
            transition: opacity 300ms ease-out;
            background-color: ${colors.primary}cd;
          }

          .container--exiting,
          .container--exited {
            position: absolute;
            opacity: 0;
          }

          .container--entering {
            animation: opacity 300ms ease-in;
            z-index: 1;
          }

          .toolbarContainer {
            display: flex;
            align-items: flex-start;
            height: 100%;
            width: 12.5rem;
          }

          .toolbarAnimation {
            height: 100%;
            width: 100%;
          }

          @keyframes opacity {
            0% {
              opacity: 0;
            }

            100% {
              opacity: 1;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default Home;
