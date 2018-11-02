import * as firebase from 'firebase/app';
import 'firebase/auth';
import AuthenticationError from './AuthenticationError';
import { FirebaseError } from './AuthenticationError/AuthenticationError.type';

class Authentication {
  public onUserStatusChange(cb: (user: firebase.User | null) => void) {
    if (firebase.apps.length) {
      firebase.auth().onAuthStateChanged((user) => {
        cb(user);
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
