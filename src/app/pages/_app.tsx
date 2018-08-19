import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import withReduxStore from '../libs/with-redux-store';

interface PropsType {
  reduxStore: Store;
}

class MyApp extends App<PropsType> {
  public render(): React.ReactElement<MyApp> {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withReduxStore(MyApp);
