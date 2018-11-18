import * as functions from 'firebase-functions';
import customServer from '../../server/';

const nextApp = functions.https.onRequest((request, response) => {
  console.log('File: ' + request.originalUrl);
  console.log('dev:', dev);
  // log the page.js file or resource being requested

  return customServer;
});

export { nextApp };
