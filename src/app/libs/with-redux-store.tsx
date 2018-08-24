import React, { Component } from 'react';
import { Store } from 'redux';
import { initializeStore } from '../store';

const isServer = typeof window === 'undefined';
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

declare global {
  interface Window {
    [__NEXT_REDUX_STORE__]: Store;
  }
}

interface State {
  reduxStore: any;
}

interface PropTypes {
  initialReduxState: object;
}

function getOrCreateStore(initialState?: object) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeStore(initialState);
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore(initialState);
  }
  return window[__NEXT_REDUX_STORE__];
}

interface ExtendedElement extends React.ComponentClass<any> {
  getInitialProps: any;
}

export default (App: ExtendedElement) => {
  return class AppWithRedux extends Component<PropTypes, State> {
    public static async getInitialProps(appContext: any) {
      // Get or Create the store with `undefined` as initialState
      // This allows you to set a custom default initialState
      const reduxStore = getOrCreateStore();

      // Provide the store to getInitialProps of pages
      appContext.ctx.reduxStore = reduxStore;

      let appProps = {};
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps.call(App, appContext);
      }

      return {
        ...appProps,
        initialReduxState: reduxStore.getState(),
      };
    }

    constructor(props: PropTypes) {
      super(props);
      this.state = {
        reduxStore: getOrCreateStore(props.initialReduxState),
      };
    }

    public render() {
      return <App {...this.props} reduxStore={this.state.reduxStore} />;
    }
  };
};
