import SubscribeHandler from '@containers/SubscribeHandler';
import Authentication from '@layouts/Authentication';
import React from 'react';
import { IPageProps } from '../../page.type';

const SubscribePage = (props: IPageProps): React.ReactElement<Authentication> => (
  <Authentication {...props}>
    <SubscribeHandler />
  </Authentication>
);

SubscribePage.displayName = 'Auth';

export default SubscribePage;
