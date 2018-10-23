import * as firebase from 'firebase/app';
import 'firebase/auth';
import AuthenticationError from './AuthenticationError';
import { FirebaseError } from './AuthenticationError/AuthenticationError.type';

class Authentication {
  public async createUser(email: string, password: string) {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error: FirebaseError) => {
        throw new AuthenticationError(`Error code ${error.code}: ${error.message}`);
      });
  }

  public async facebookAuth() {
    const provider = new firebase.auth.FacebookAuthProvider();
    provider.setCustomParameters({
      display: 'popup',
    });
    firebase.auth().useDeviceLanguage();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export default new Authentication();
