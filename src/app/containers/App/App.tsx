import Header from '@components/Header';
import firebase from '@firebase/app';
import React, { Component } from 'react';
import colors from '../../constants/colors';
import { config } from './constants';

interface PropsType {
  children: JSX.Element[] | JSX.Element;
}
class App extends Component<PropsType, {}> {
  public componentDidMount() {
    firebase.initializeApp(config);
  }

  public render() {
    const { children } = this.props;
    return (
      <div className="page">
        <Header />
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
