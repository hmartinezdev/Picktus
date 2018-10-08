import Head from 'next/head';
import React, { Component } from 'react';

class Header extends Component {
  public render(): React.ReactElement<Header> {
    return (
      <Head>
        <title>Picktus</title>
        <link href="https://fonts.googleapis.com/css?family=Josefin+Sans:400|Caveat" rel="stylesheet" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
        <link rel="manifest" href="/static/site.webmanifest" />
        <link rel="mask-icon" href="/static/safari-pinned-tab.svg" color="#2d3047" />
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <meta name="msapplication-TileColor" content="#2d3047" />
        <meta name="msapplication-config" content="/static/browserconfig.xml" />
        <meta name="theme-color" content="#2d3047" />
      </Head>
    );
  }
}

export default Header;
