import { server, app } from './server';
import * as functions from 'firebase-functions';

const dev = process.env.NODE_ENV !== 'production';

const nextApp = functions.https.onRequest(async (req, res) => {
  console.log('File: ' + req.originalUrl);
  console.log('dev:', dev);
  // log the page.js file or resource being requested

  await app.prepare();
  return server(req, res);
});

export { nextApp };
