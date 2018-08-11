import React, { Component } from 'react';
import Head from 'next/head';

class Header extends Component {
  render() {
    return (
      <Head>
        <title>Picktus</title>
        <link href="https://fonts.googleapis.com/css?family=Josefin+Sans:400|Nanum+Pen+Script" rel="stylesheet" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
    );
  }
}

export default Header;
