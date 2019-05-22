import SubscribeHandler from '@components/SubscribeHandler';
import Authentication from '@containers/Authentication';
import React from 'react';
import { IPageProps } from '../../page.type';

const SubscribePage = (props: IPageProps): React.ReactElement<Authentication> => (
  <Authentication {...props}>
    <SubscribeHandler />
  </Authentication>
);

SubscribePage.displayName = 'SubscribePage';

export default SubscribePage;
