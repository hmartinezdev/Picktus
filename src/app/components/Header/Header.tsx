import Head from 'next/head';
import React, { Component } from 'react';

class Header extends Component {
  public render(): React.ReactElement<Header> {
    return (
      <Head>
        <title>Picktus</title>
        <link href="https://fonts.googleapis.com/css?family=Josefin+Sans:400|Caveat" rel="stylesheet" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
    );
  }
}

export default Header;
