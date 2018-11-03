import Header from '@components/Header';
import Loader from '@components/Loader';
import colors from '@constants/colors';
import Authentication from '@services/authentication';
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

    Authentication.onUserStatusChange((user) => {
      if (user) {
        props.userLoginSuccess(user);
      }
    });
  }

  public render(): React.ReactElement<App> {
    const { children, showLoader } = this.props;
    return (
      <div className="page">
        <Header />
        {showLoader && <Loader />}
        {children}
        <style jsx>{`
          .page {
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
