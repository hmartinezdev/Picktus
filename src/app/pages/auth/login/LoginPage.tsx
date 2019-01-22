import Login from '@containers/Login';
import React from 'react';
import { IPageProps } from '../../page.type';

const LoginPage = (props: IPageProps): React.ReactElement<Login> => <Login {...props} />;

LoginPage.displayName = 'LoginPage';

export default LoginPage;
