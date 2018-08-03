import { Component } from 'react';
import Head from 'next/head'

class Page extends Component {
    render() {
        return <div className="page">
            <Head>
                <title>Picktus</title>
                <link href="https://fonts.googleapis.com/css?family=Pacifico" rel="stylesheet" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className="logoContainer">
                <img className="logo" src="/static/logo.png"></img>
                <h1 className="title">Picktus</h1>
            </div>
            <style jsx>{`
            .page {
                min-height: 100vh;
                background-color: #f7dab7;
            }

            .title {
                font-family: 'Pacifico', cursive;
                font-size: 6.5rem;
                margin-left: 1rem;
                color: #3b3937;
            }

            .logoContainer {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 1rem;
            }

            .logo {
                width: 200px;
            }

            :global(*) {
                padding:0;
                margin:0;
            }

            :global(html) {
                font-size: 100%;
            }
            `}</style>
        </div>;
    }
}

export default Page;