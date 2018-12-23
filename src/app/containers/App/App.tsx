import Background from '@components/Background';
import Header from '@components/Header';
import Loader from '@components/Loader';
import Messages from '@components/Messages';
import firebase from 'firebase/app';
import { withRouter } from 'next/router';
import React, { Component } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';
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
    const { children, showLoader, router } = this.props;

    return (
      <Background>
        <div className="page">
          <Header />
          <Messages />
          {showLoader && <Loader />}
          <TransitionGroup className="app_transitiongroup" appear={false}>
            {React.Children.map(children, (child) => (
              <Transition key={router.route} timeout={600} mountOnEnter={true} unmountOnExit={true} appear={false}>
                {(status) => React.cloneElement(child as React.ReactElement<any>, { status })}
              </Transition>
            ))}
          </TransitionGroup>
          <style jsx>{`
            .page {
              overflow: hidden;
              min-height: 100vh;
              display: flex;
              align-self: stretch;
              overflow: hidden;
              width: 100%;
            }

            :global(.app_transitiongroup) {
              overflow: hidden;
              min-height: 100vh;
              display: flex;
              align-self: stretch;
              overflow: hidden;
              width: 100%;
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
      </Background>
    );
  }
}

export default withRouter(App);
