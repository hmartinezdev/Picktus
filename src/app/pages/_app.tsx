import PicktusApp from '@layouts/App';
import withReduxStore from '@libs/with-redux-store';
import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';

interface PropsType {
  reduxStore: Store;
}

class MyApp extends App<PropsType> {
  public render(): React.ReactElement<MyApp> {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <Provider store={reduxStore}>
          <PicktusApp>
            <Component {...pageProps} />
          </PicktusApp>
        </Provider>
      </Container>
    );
  }
}

export default withReduxStore(MyApp);
