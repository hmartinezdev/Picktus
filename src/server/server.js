const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const next = require('next');
const compression = require('compression');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./firebase.js');
const authenticate = require('./authentication.js');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://picktus-76101.firebaseio.com/',
});

const dev = process.env.NODE_ENV !== 'production';
const appConf = { dev };

if (!dev) {
  appConf.conf = { distDir: 'next' };
} else {
  appConf.dir = './src/app';
}

const app = next(appConf);
const handle = app.getRequestHandler();

const server = express();
server.disable('x-powered-by');
server.use(cors());
server.use(bodyParser.json());
server.use(cookieParser());
server.set('trust proxy', 1);
server.use(compression());

server.post('/sessionlogin', (req, res) => {
  // Get the ID token passed and the CSRF token.
  const idToken = req.body.idToken.toString();

  // Set session expiration to 5 days.
  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  // Create the session cookie. This will also verify the ID token in the process.
  // The session cookie will have the same claims as the ID token.
  // To only allow session cookie setting on recent sign-in, auth_time in ID token
  // can be checked to ensure user was recently signed in before creating a session cookie.
  admin
    .auth()
    .createSessionCookie(idToken, { expiresIn })
    .then(
      (sessionCookie) => {
        // Set cookie policy for session cookie.
        const options = { maxAge: expiresIn };
        res.cookie('session', sessionCookie, options);
        res.end(JSON.stringify({ status: 'success' }));
      },
      (error) => {
        res.status(401).send('UNAUTHORIZED REQUEST!');
      }
    );
});

server.get('/_next/*', async (req, res) => {
  handle(req, res);
});

server.get('/static/*', async (req, res) => {
  handle(req, res);
});

server.get('/auth', async (req, res) => {
  res.redirect('/auth/login');
});

server.get('*', async (req, res) => {
  const user = await authenticate(req, res);
  req.firebaseUser = user;

  if (!user && req.originalUrl !== '/auth/login' && req.originalUrl !== '/auth/subscribe') {
    res.redirect('/auth/login');
  } else {
    handle(req, res);
  }
});

module.exports = { server, app };
