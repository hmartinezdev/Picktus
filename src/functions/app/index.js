import * as functions from 'firebase-functions';
import next from 'next';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import admin from 'firebase-admin';
import serviceAccount from './firebase.js';
import authenticate from './authentication.js';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://picktus-76101.firebaseio.com/',
});

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, conf: { distDir: 'next' } });
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

server.get('*', async (req, res) => {
  const user = await authenticate(req, res);
  req.firebaseUser = user;
  return handle(req, res);
});

const nextApp = functions.https.onRequest(async (req, res) => {
  console.log('File: ' + req.originalUrl);
  console.log('dev:', dev);
  // log the page.js file or resource being requested

  await app.prepare();
  return server(req, res);
});

export { nextApp };
