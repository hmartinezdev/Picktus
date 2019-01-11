import Login from '@containers/Login';
import React from 'react';
import { IPageProps } from '../page.type';

const SubscribePage = (props: IPageProps): React.ReactElement<Login> => <Login {...props} />;

SubscribePage.displayName = 'SubscribePage';

export default SubscribePage;
