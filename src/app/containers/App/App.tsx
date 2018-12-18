import Header from '@components/Header';
import Loader from '@components/Loader';
import Messages from '@components/Messages';
import colors from '@constants/colors';
import firebase from 'firebase/app';
import React, { Component } from 'react';
import { IAppPropsType } from './App.type';
import { config } from './constants';

class App extends Component<IAppPropsType> {
  constructor(props: IAppPropsType) {
    super(props);

    // If the firebase setup has not been done yet
    // we do it here
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
  }

  public render(): React.ReactElement<App> {
    const { children, showLoader } = this.props;
    return (
      <div className="page">
        <Header />
        <Messages />
        {showLoader && <Loader />}
        {children}
        <style jsx>{`
          .page {
            overflow: hidden;
            min-height: 100vh;
            background-color: ${colors.primary};
          }
          :global(*) {
            padding: 0;
            margin: 0;
          }

          :global(html) {
            font-size: 100%;
          }
        `}</style>
      </div>
    );
  }
}

export default App;
