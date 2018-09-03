import App from '@containers/App';
import Login from '@containers/Login';
import React from 'react';

export default (): React.ReactElement<App> => (
  <App>
    <Login />
  </App>
);
