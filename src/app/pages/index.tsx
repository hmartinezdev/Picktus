import Home from '@containers/Home';
import React from 'react';
import { IPageProps } from './page.type';

export default (props: IPageProps): React.ReactElement<Home> => <Home {...props} />;
