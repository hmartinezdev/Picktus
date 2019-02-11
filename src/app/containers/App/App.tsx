import Background from '@components/Background';
import GlobalLoader from '@components/GlobalLoader';
import Header from '@components/Header';
import Messages from '@components/Messages';
import { Page } from '@pages/page.type';
import firebase from 'firebase/app';
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
    const { children, showLoader } = this.props;

    return (
      <Background>
        <div className="page">
          <Header />
          <Messages />
          {showLoader && <GlobalLoader />}
          <TransitionGroup className="app_transitiongroup" appear={false}>
            {React.Children.map(children, (child) => (
              <Transition
                key={(child as Page).type.displayName || ''}
                timeout={600}
                mountOnEnter={true}
                unmountOnExit={true}
                appear={false}
              >
                {(status) => React.cloneElement(child as Page, { status })}
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
              position: relative;
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

export default App;
