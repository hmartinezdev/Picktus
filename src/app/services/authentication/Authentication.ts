import firebase from 'firebase/app';
import 'firebase/auth';
import AuthenticationError, { FirebaseError } from './AuthenticationError';

class Authentication extends Object {
  constructor() {
    super();
  }

  public async createUser(email: string, password: string) {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error: FirebaseError) => {
        throw new AuthenticationError(`Error code ${error.code}: ${error.message}`);
      });
  }
}

export default new Authentication();
