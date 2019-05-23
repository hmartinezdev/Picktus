import Home from '@layouts/Home';
import React from 'react';
import { IPageProps } from './page.type';

const HomePage = (props: IPageProps): React.ReactElement<Home> => <Home {...props} />;

HomePage.displayName = 'HomePage';

export default HomePage;
