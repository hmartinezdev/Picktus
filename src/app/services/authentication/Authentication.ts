import * as firebase from 'firebase/app';
import 'firebase/auth';
import fetch from 'isomorphic-unfetch';
import AuthenticationError from './AuthenticationError';
import { FirebaseError } from './AuthenticationError/AuthenticationError.type';

class Authentication {
  public onUserStatusChange(cb: (user: firebase.User) => void) {
    if (firebase.apps.length) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          cb(user);

          // Get the user's ID token as it is needed to exchange for a session cookie.
          user.getIdToken().then((idToken) => {
            // Session login endpoint is queried and the session cookie is set.
            // CSRF protection should be taken into account.
            // ...
            return fetch('/sessionl(req, res) => {
              // Get the ID token passed and the CSRF token.
              const idToken = req.body.idToken.toString();
              const csrfToken = req.body.csrfToken.toString();
              // Guard against CSRF attacks.
              
              if (csrfToken !== req.cookies.csrfToken) {
                res.status(401).send('UNAUTHORIZED REQUEST!');
                return;
              }
              // Set session expiration to 5 days. const expiresIn = 60 * 60 * 24 * 5 * 1000;
              // Create the session cookie. This will also verify the ID token in the process.
              // The session cookie will have the same claims as the ID token.
              // To only allow session cookie setting on recent sign-in, auth_time in ID token
              // can be checked to ensure user was recently signed in before creating a session cookie.
              admin.auth().createSessionCookie(idToken, {expiresIn}).then((sessionCookie) => {
                // Set cookie policy for session cookie.
                const options = {maxAge: expiresIn, httpOnly: true, secure: true};
                res.cookie('session', sessionCookie, options);
                res.end(JSON.stringify({status: 'success'});
              }, error => {
                res.status(401).send('UNAUTHORIZED REQUEST!');
              });
            }ogin', { method: 'POST', body: JSON.stringify({ idToken }) });
          });
        }
      });
    }
  }
  public async createUser(email: string, password: string) {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error: FirebaseError) => {
        throw new AuthenticationError(`Authentication::createUser Error code ${error.code}: ${error.message}`);
      });
  }

  public async facebookAuth() {
    const provider = new firebase.auth.FacebookAuthProvider();
    provider.setCustomParameters({
      display: 'popup',
    });
    firebase.auth().useDeviceLanguage();

    return firebase
      .auth()
      .signInWithPopup(provider)
      .catch((error) => {
        throw new AuthenticationError(`Authentication::facebookAuth Error code ${error.code}: ${error.message}`);
      });
  }

  public async googleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().useDeviceLanguage();
    return firebase
      .auth()
      .signInWithPopup(provider)
      .catch((error) => {
        throw new AuthenticationError(`Authentication::googleAuth Error code ${error.code}: ${error.message}`);
      });
  }

  public async twitterAuth() {
    const provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().useDeviceLanguage();
    return firebase
      .auth()
      .signInWithPopup(provider)
      .catch((error) => {
        throw new AuthenticationError(`Authentication::twitterAuth Error code ${error.code}: ${error.message}`);
      });
  }

  public async signin(email: string, password: string) {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        throw new AuthenticationError(`Authentication::signin Error code ${error.code}: ${error.message}`);
      });
  }
}

export default new Authentication();
