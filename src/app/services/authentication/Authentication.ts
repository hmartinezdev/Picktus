import { session } from '@constants/cookies';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import fetch from 'isomorphic-unfetch';
import Cookies from 'js-cookie';
import {
  delegatedMethods,
  FirebaseErrorCodes,
  ISigninMethodsMap,
  ISigninOptions,
  SigninMethods,
} from './Authentication.type';
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

  public async disconnect() {
    await firebase
      .auth()
      .signOut()
      .catch((error) => {
        throw this.handleFirebaseError(error, 'signout');
      });

    // Remove the cookie set in session
    Cookies.remove(session);

    // reloading page to ensure the user is disconnected
    if (window && window.location) {
      window.location.reload();
    }
  }

  /**
   * Handle the generation of formated error
   *
   * @param error - error dispatched by firebase
   * @param func - function from which the error has been thrown
   */
  public handleFirebaseError(error: FirebaseError, func: string) {
    switch (error.code) {
      case FirebaseErrorCodes.TOO_MANY_REQUEST:
        return new AuthenticationError(
          `Authentication::${func} too many requests`,
          'You tried too many time to signin, please try again later'
        );
      case FirebaseErrorCodes.NETWOR_REQUEST_FAILED:
        return new AuthenticationError(
          `Authentication::${func} network error`,
          'You are currently in a slow network area, please try again later'
        );
      case FirebaseErrorCodes.INVALID_API_KEY:
        return new AuthenticationError(
          `Authentication::${func} invalid API provided`,
          'A client error has occured, please contact the consumer service'
        );
      case FirebaseErrorCodes.INVALID_EMAIL:
        return new AuthenticationError(
          `Authentication::${func} invalid email provided by the user`,
          'The email you provided is not a valid email address'
        );
      case FirebaseErrorCodes.USER_NOT_FOUND:
        return new AuthenticationError(
          `Authentication::${func} email was not associated with an account`,
          'The email you provided is not associated with an existing account'
        );
      case FirebaseErrorCodes.WRONG_PASSWORD:
        return new AuthenticationError(
          `Authentication::${func} password provided did not correspond with the email`,
          'The password and email combination is not associated with an existing account'
        );
      case FirebaseErrorCodes.ACCOUNT_ALREADY_EXIST_WITH_DIFFERENT_CREDENTIAL:
      case FirebaseErrorCodes.EMAIL_ALREADY_USED:
        return new AuthenticationError(
          `Authentication::${func} an account already exists with the user email`,
          'An account is already associated with this email'
        );
      case FirebaseErrorCodes.POPUP_BLOCKED:
        return new AuthenticationError(
          `Authentication::${func} popin blocked by navigator`,
          'The authentication popin has been blocked by your navigator'
        );
      case FirebaseErrorCodes.WEAK_PASSWORD:
        return new AuthenticationError(
          `Authentication::${func} popin blocked by navigator`,
          'The authentication popin has been blocked by your navigator'
        );
      case FirebaseErrorCodes.CANCELLED_POPUP:
        return new AuthenticationError(
          `Authentication::${func} popin cancelled because a new one has been opened`,
          'The previous authentication popup has been closed because you opened a new one'
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
