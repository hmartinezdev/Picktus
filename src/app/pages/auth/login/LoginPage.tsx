import LoginHandler from '@components/LoginHandler';
import Authentication from '@containers/Authentication';
import React from 'react';
import { IPageProps } from '../../page.type';

const LoginPage = (props: IPageProps): React.ReactElement<Authentication> => (
  <Authentication {...props}>
    <LoginHandler />
  </Authentication>
);

LoginPage.displayName = 'LoginPage';

export default LoginPage;
