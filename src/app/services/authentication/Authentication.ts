import auth from 'firebase/auth';
import AuthenticationError from './AuthenticationError';

class Authentication extends Object {
  constructor() {
    super();
  }

  public async createUser(email: string, password: string) {
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        throw new AuthenticationError(`Error code ${error.code}: ${error.message}`);
      });
  }
}

export default new Authentication();
