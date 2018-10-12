import Header from '@components/Header';
import Loader from '@components/Loader';
import firebase from 'firebase/app';
import React, { Component } from 'react';
import colors from '../../constants/colors';
import { config } from './constants';

interface IAppPropsType {
  children: JSX.Element[] | JSX.Element;
  showLoader: boolean;
}
class App extends Component<IAppPropsType, {}> {
  public componentDidMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
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
