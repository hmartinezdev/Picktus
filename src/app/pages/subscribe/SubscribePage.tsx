import Subscribe from '@containers/Subscribe';
import React from 'react';
import { IPageProps } from '../page.type';

const SubscribePage = (props: IPageProps): React.ReactElement<SubscribePage> => <Subscribe {...props} />;

SubscribePage.displayName = 'SubscribePage';

export default SubscribePage;
