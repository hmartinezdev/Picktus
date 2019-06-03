import LoginHandler from '@containers/LoginHandler';
import Authentication from '@layouts/Authentication';
import React from 'react';
import { IPageProps } from '../../page.type';

const LoginPage = (props: IPageProps): React.ReactElement<Authentication> => (
  <Authentication {...props}>
    <LoginHandler key="LoginHandler" />
  </Authentication>
);

LoginPage.displayName = 'Auth';

export default LoginPage;
