import * as firebase from 'firebase/app';
import fetch from 'isomorphic-unfetch';
import { incorrectUserCredentials, validUserCredentials } from './Authentication.mock';
import Authentication, { SigninMethods } from './';
import { FirebaseErrorCodes } from './Authentication.type';
import Cookies from 'js-cookie';

jest.mock('isomorphic-unfetch');

describe('Authentication service', () => {
  describe('createUser', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    test('it should call firebase to create the new user', async () => {
      jest
        .spyOn(firebase, 'auth')
        .mockImplementation(() => ({ createUserWithEmailAndPassword: () => new Promise((resolve) => resolve()) }));

      await Authentication.createUser('test', 'test');
      expect(firebase.auth).toHaveBeenCalledTimes(1);
    });

    test('it should throw an error if the user creation fails', async () => {
      jest.spyOn(firebase, 'auth').mockImplementation(() => ({
        createUserWithEmailAndPassword: () =>
          new Promise(() => {
            throw new Error('test');
          }),
      }));

      let error = null;

      try {
        await Authentication.createUser('test', 'test');
      } catch (e) {
        error = e;
      }

      expect(error instanceof Error).toBe(true);
    });
  });

  describe('signin', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    describe('with classic method', () => {
      test('it should throw an error if password or email is not defined in the options', async () => {
        let error;

        try {
          await Authentication.signin(SigninMethods.CLASSIC, { password: 'test' });
        } catch (e) {
          error = e;
        }

        expect(error instanceof Error).toBe(true);
        error = undefined;

        try {
          await Authentication.signin(SigninMethods.CLASSIC, {});
        } catch (e) {
          error = e;
        }

        expect(error instanceof Error).toBe(true);
        error = undefined;

        try {
          await Authentication.signin(SigninMethods.CLASSIC, { email: 'test' });
        } catch (e) {
          error = e;
        }

        expect(error instanceof Error).toBe(true);
      });

      test('it should throw an error if the user login fails', async () => {
        jest.spyOn(firebase, 'auth').mockImplementation(() => ({
          signInWithEmailAndPassword: () =>
            new Promise(() => {
              throw new Error('test');
            }),
        }));

        let error = null;

        try {
          await Authentication.signin(SigninMethods.CLASSIC, { email: 'email', password: 'password' });
        } catch (e) {
          error = e;
        }

        expect(error instanceof Error).toBe(true);
      });

      test('it should return the user if the authentication proceed correctly', async () => {
        const spySignin = jest.fn().mockImplementation(() => new Promise((resolve) => resolve(validUserCredentials)));
        jest.spyOn(firebase, 'auth').mockImplementation(() => ({ signInWithEmailAndPassword: spySignin }));

        const result = await Authentication.signin(SigninMethods.CLASSIC, { email: 'email', password: 'password' });
        fetch.mockResolvedValue(undefined);

        expect(spySignin).toHaveBeenCalledWith('email', 'password');
        expect(fetch).toHaveBeenCalledWith('/sessionlogin', {
          body: JSON.stringify({ idToken: 'idToken' }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        });
        expect(result).toEqual(validUserCredentials.user);
      });
    });

    describe('Delegated authentication', () => {
      let spyAuth;

      afterEach(() => {
        jest.restoreAllMocks();
      });

      beforeEach(() => {
        spyAuth = jest.spyOn(Authentication, 'delegatedAuthentication').mockImplementation(() => validUserCredentials);
        fetch.mockResolvedValue(undefined);
      });

      test('it should return the user if the facebook authentication proceed correctly', async () => {
        const result = await Authentication.signin(SigninMethods.FACEBOOK);

        expect(spyAuth).toHaveBeenCalledWith(SigninMethods.FACEBOOK);
        expect(fetch).toHaveBeenCalledWith('/sessionlogin', {
          body: JSON.stringify({ idToken: 'idToken' }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        });
        expect(result).toEqual(validUserCredentials.user);
      });
    });

    describe('General case', () => {
      afterEach(() => {
        jest.restoreAllMocks();
      });

      test('if no user is returned from auth, it should throw an error', async () => {
        const spySignin = jest.fn().mockImplementation(() => new Promise((resolve) => resolve()));
        jest.spyOn(firebase, 'auth').mockImplementation(() => ({ signInWithEmailAndPassword: spySignin }));

        try {
          await Authentication.signin(SigninMethods.CLASSIC, { email: 'email', password: 'password' });
        } catch (e) {
          expect(e instanceof Error).toBe(true);
        }
      });

      test('it should throw an error if the user credentials are incorrects', async () => {
        jest.spyOn(firebase, 'auth').mockImplementation(() => ({
          signInWithEmailAndPassword: () =>
            new Promise((resolve) => {
              resolve(incorrectUserCredentials);
            }),
        }));

        let error = null;

        try {
          await Authentication.signin(SigninMethods.CLASSIC, { email: 'email', password: 'password' });
        } catch (e) {
          error = e;
        }

        expect(error instanceof Error).toBe(true);
      });
    });
  });

  describe('delegatedAuthentication', () => {
    let spyUsedDevice = jest.fn();
    let spySigninWP = jest.fn().mockImplementation(() => new Promise((resolve) => resolve()));
    let spyCustomParm = jest.fn();
    let authProvider;
    beforeEach(() => {
      const auth = function() {
        return {
          signInWithPopup: spySigninWP,
          useDeviceLanguage: spyUsedDevice,
        };
      };

      authProvider = jest.spyOn(firebase, 'auth').mockImplementation(auth);
      authProvider.FacebookAuthProvider = class FacebookAuthProvider {
        setCustomParameters = spyCustomParm;
      };
      authProvider.GoogleAuthProvider = class GoogleAuthProvider {};
      authProvider.TwitterAuthProvider = class TwitterAuthProvider {};
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    test('it should work with facebook authentication', async () => {
      await Authentication.delegatedAuthentication(SigninMethods.FACEBOOK);

      expect(firebase.auth).toHaveBeenCalledTimes(2);
      expect(spyUsedDevice).toHaveBeenCalled();
      expect(spyCustomParm).toHaveBeenCalledWith({
        display: 'popup',
      });
      expect(spySigninWP).toHaveBeenCalledWith(new authProvider.FacebookAuthProvider());
    });

    test('it should work with google authentication', async () => {
      await Authentication.delegatedAuthentication(SigninMethods.GOOGLE);

      expect(firebase.auth).toHaveBeenCalledTimes(2);
      expect(spyUsedDevice).toHaveBeenCalled();
      expect(spySigninWP).toHaveBeenCalledWith(new authProvider.GoogleAuthProvider());
    });

    test('it should work with twitter authentication', async () => {
      await Authentication.delegatedAuthentication(SigninMethods.TWITTER);

      expect(firebase.auth).toHaveBeenCalledTimes(2);
      expect(spyUsedDevice).toHaveBeenCalled();
      expect(spySigninWP).toHaveBeenCalledWith(new authProvider.TwitterAuthProvider());
    });

    test('it should throw an error if the user authentication fails', async () => {
      spySigninWP.mockImplementation(
        () =>
          new Promise(() => {
            throw new Error();
          })
      );

      let error = null;

      try {
        await Authentication.delegatedAuthentication(SigninMethods.FACEBOOK);
      } catch (e) {
        error = e;
      }

      expect(spyUsedDevice).toHaveBeenCalledWith();
      expect(spyCustomParm).toHaveBeenCalledWith({
        display: 'popup',
      });
      expect(error instanceof Error).toBe(true);
    });
  });

  describe('disconnect', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    let signOutSpy;

    test('it should call firebase to create the new user', async () => {
      const spyCook = jest.spyOn(Cookies, 'remove').mockImplementation(() => undefined);
      const spyWindow = jest.spyOn(window.location, 'reload').mockImplementation(() => undefined);
      signOutSpy = jest.fn(() => new Promise((resolve) => resolve()));
      jest.spyOn(firebase, 'auth').mockImplementation(() => ({ signOut: signOutSpy }));

      await Authentication.disconnect();
      expect(firebase.auth).toHaveBeenCalledTimes(1);
      expect(signOutSpy).toHaveBeenCalledTimes(1);
      expect(spyCook).toHaveBeenCalledWith('session');
      expect(spyWindow).toHaveBeenCalled();
    });

    test('it should throw an error if the user creation fails', async () => {
      signOutSpy = jest.fn(
        () =>
          new Promise(() => {
            throw new Error('test');
          })
      );

      jest.spyOn(firebase, 'auth').mockImplementation(() => ({
        signOut: signOutSpy,
      }));

      let error = null;

      try {
        await Authentication.disconnect();
      } catch (e) {
        error = e;
      }

      expect(firebase.auth).toHaveBeenCalledTimes(1);
      expect(signOutSpy).toHaveBeenCalledTimes(1);
      expect(error instanceof Error).toBe(true);
    });
  });

  describe('handleFirebaseError', () => {
    test('error message to fit the error code', () => {
      expect(
        Authentication.handleFirebaseError(FirebaseErrorCodes.ACCOUNT_ALREADY_EXIST_WITH_DIFFERENT_CREDENTIAL)
      ).toMatchSnapshot();
      expect(Authentication.handleFirebaseError({ code: FirebaseErrorCodes.TOO_MANY_REQUEST })).toMatchSnapshot();
      expect(Authentication.handleFirebaseError({ code: FirebaseErrorCodes.NETWOR_REQUEST_FAILED })).toMatchSnapshot();
      expect(Authentication.handleFirebaseError({ code: FirebaseErrorCodes.INVALID_API_KEY })).toMatchSnapshot();
      expect(Authentication.handleFirebaseError({ code: FirebaseErrorCodes.INVALID_EMAIL })).toMatchSnapshot();
      expect(Authentication.handleFirebaseError({ code: FirebaseErrorCodes.USER_NOT_FOUND })).toMatchSnapshot();
      expect(Authentication.handleFirebaseError({ code: FirebaseErrorCodes.WRONG_PASSWORD })).toMatchSnapshot();
      expect(Authentication.handleFirebaseError({ code: FirebaseErrorCodes.EMAIL_ALREADY_USED })).toMatchSnapshot();
      expect(Authentication.handleFirebaseError({ code: FirebaseErrorCodes.POPUP_BLOCKED })).toMatchSnapshot();
      expect(Authentication.handleFirebaseError({ code: FirebaseErrorCodes.WEAK_PASSWORD })).toMatchSnapshot();
      expect(Authentication.handleFirebaseError({ code: FirebaseErrorCodes.CANCELLED_POPUP })).toMatchSnapshot();
      expect(Authentication.handleFirebaseError({ code: 'random' })).toMatchSnapshot();
    });
  });
});
