import * as firebase from 'firebase/app';
import 'firebase/auth';
import fetch from 'isomorphic-unfetch';
import { ISigninMethodsMap, SigninMethods } from './Authentication.type';
import AuthenticationError from './AuthenticationError';
import { FirebaseError } from './AuthenticationError/AuthenticationError.type';

class Authentication {
  public async createUser(email: string, password: string) {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error: FirebaseError) => {
        throw new AuthenticationError(`Authentication::createUser Error code ${error.code}: ${error.message}`);
      });
  }

  private async delegatedAuthentication(method: SigninMethods) {
    const providers: ISigninMethodsMap = {
      [SigninMethods.FACEBOOK]: new firebase.auth.FacebookAuthProvider(),
      [SigninMethods.GOOGLE]: new firebase.auth.GoogleAuthProvider(),
      [SigninMethods.TWITTER]: new firebase.auth.TwitterAuthProvider(),
      [SigninMethods.CLASSIC]: undefined,
    };

    const provider = providers[method];

    // Use the navigator default language
    firebase.auth().useDeviceLanguage();

    if (method === SigninMethods.FACEBOOK) {
      provider.setCustomParameters({
        display: 'popup',
      });
    }

    return firebase
      .auth()
      .signInWithPopup(provider)
      .catch((error) => {
        throw new AuthenticationError(
          `Authentication::delegatedAuthentication Error code ${error.code}: ${error.message}`
        );
      });
  }

  public async signin(method: SigninMethods, options: IStringMap = {}) {
    let userCredentials: firebase.auth.UserCredential;

    if (method === SigninMethods.CLASSIC) {
      if (!options.email || !options.password) {
        throw new AuthenticationError(
          "Authentication::signin You can't use classic signin method without password or email passed as option"
        );
      }

      userCredentials = await firebase
        .auth()
        .signInWithEmailAndPassword(options.email, options.password)
        .catch((error) => {
          throw new AuthenticationError(
            `Authentication::signin Error code ${error.code} during classic authentication: ${error.message}`
          );
        });
    } else {
      userCredentials = await this.delegatedAuthentication(method);
    }

    if (!userCredentials || !userCredentials.user) {
      throw new AuthenticationError(`Authentication::signin No user retrieved from firebase`);
    }

    const user = userCredentials.user;

    if (user) {
      // Get the user's ID token as it is needed to exchange for a session cookie.
      user.getIdToken().then((idToken) => {
        // Session login endpoint is queried and the session cookie is set.
        // CSRF protection should be taken into account.
        // ...
        return fetch('/sessionlogin', {
          body: JSON.stringify({ idToken }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        });
      });
    }

    return user;
  }
}

export default new Authentication();
