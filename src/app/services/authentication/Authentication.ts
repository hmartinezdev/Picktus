import * as firebase from 'firebase/app';
import 'firebase/auth';
import fetch from 'isomorphic-unfetch';
import { delegatedMethods, ISigninMethodsMap, ISigninOptions, SigninMethods } from './Authentication.type';
import AuthenticationError from './AuthenticationError';
import { FirebaseError } from './AuthenticationError/AuthenticationError.type';

class Authentication {
  public async createUser(email: string, password: string) {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error: FirebaseError) => {
        throw this.handleFirebaseError(error, 'createUser');
      });
  }

  /**
   * Function handling the the social network signin
   *
   * @param method - method of authentication
   */
  private async delegatedAuthentication(method: delegatedMethods) {
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
        throw this.handleFirebaseError(error, 'delegatedAuthentication');
      });
  }

  /**
   * Function handling the whole signin process
   *
   * @param method - method of authentication, can be either classic or via social networks
   * @param options - options needed to signin with a specific method
   */
  public async signin(method: SigninMethods, options: ISigninOptions = {}) {
    let userCredentials: firebase.auth.UserCredential;
    if (method === SigninMethods.CLASSIC) {
      if (!options.email || !options.password) {
        throw new AuthenticationError(
          "Authentication::signin You can't use classic signin method without password or email passed as option",
          'A password and an email is necessary to signin'
        );
      }

      userCredentials = await firebase
        .auth()
        .signInWithEmailAndPassword(options.email, options.password)
        .catch((error) => {
          throw this.handleFirebaseError(error, 'signin');
        });
    } else {
      userCredentials = await this.delegatedAuthentication(method);
    }

    if (!userCredentials || !userCredentials.user) {
      throw new AuthenticationError(
        `Authentication::signin No user retrieved from firebase`,
        'We have a problem with the authentication server'
      );
    }

    const user = userCredentials.user;

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

    return user;
  }

  /**
   * Handle the generation of formated error
   *
   * @param error - error dispatched by firebase
   * @param func - function from which the error has been thrown
   */
  public handleFirebaseError(error: FirebaseError, func: string) {
    switch (error.code) {
      case 'auth/too-many-requests':
        return new AuthenticationError(
          `Authentication::${func} too many requests`,
          'You tried too many time to signin, please try again later'
        );
      case 'auth/network-request-failed':
        return new AuthenticationError(
          `Authentication::${func} network error`,
          'You are currently in a slow network area, please try again later'
        );
      case 'auth/invalid-api-key':
        return new AuthenticationError(
          `Authentication::${func} invalid API provided`,
          'A client error has occured, please contact the consumer service'
        );
      case 'auth/invalid-email':
        return new AuthenticationError(
          `Authentication::${func} invalid email provided by the user`,
          'The email you provided is not a valid email address'
        );
      case 'auth/user-not-found':
        return new AuthenticationError(
          `Authentication::${func} email was not associated with an account`,
          'The email you provided is not associated with an existing account'
        );
      case 'auth/wrong-password':
        return new AuthenticationError(
          `Authentication::${func} password provided did not correspond with the email`,
          'The password and email combination is not associated with an existing account'
        );
      case 'auth/account-exists-with-different-credential':
      case 'auth/email-already-in-use':
        return new AuthenticationError(
          `Authentication::${func} an account already exists with the user email`,
          'An account is already associated with this email'
        );
      case 'auth/popup-blocked':
        return new AuthenticationError(
          `Authentication::${func} popin blocked by navigator`,
          'The authentication popin has been blocked by your navigator'
        );
      case 'auth/weak-password':
        return new AuthenticationError(
          `Authentication::${func} popin blocked by navigator`,
          'The authentication popin has been blocked by your navigator'
        );
      default:
        return new AuthenticationError(
          `Authentication::${func} Unknown error: ${error.code}::${error.message}`,
          'An unknown error has occurred'
        );
    }
  }
}

export default new Authentication();
