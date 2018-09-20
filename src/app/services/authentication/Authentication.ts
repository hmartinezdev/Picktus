import firebase from 'firebase/app';
import 'firebase/auth';
import AuthenticationError from './AuthenticationError';
import { FirebaseError } from './AuthenticationError/AuthenticationError.type';

class Authentication {
  public static async createUser(email: string, password: string) {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error: FirebaseError) => {
        throw new AuthenticationError(`Error code ${error.code}: ${error.message}`);
      });
  }
}

export default Authentication;
