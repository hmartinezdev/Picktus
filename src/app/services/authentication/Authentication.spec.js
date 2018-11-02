import * as firebase from 'firebase/app';
import Authentication from './';

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

  describe('facebookAuth', () => {
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
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    test('it should call firebase to create the new user', async () => {
      await Authentication.facebookAuth();

      expect(firebase.auth).toHaveBeenCalledTimes(2);
      expect(spySigninWP).toHaveBeenCalledWith(new authProvider.FacebookAuthProvider());
    });

    test('it should throw an error if the user creation fails', async () => {
      spySigninWP.mockImplementation(
        () =>
          new Promise(() => {
            throw new Error();
          })
      );

      let error = null;

      try {
        await Authentication.facebookAuth();
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

  describe('googleAuth', () => {
    let spyUsedDevice = jest.fn();
    let spySigninWP = jest.fn().mockImplementation(() => new Promise((resolve) => resolve()));
    let authProvider;
    beforeEach(() => {
      const auth = function() {
        return {
          signInWithPopup: spySigninWP,
          useDeviceLanguage: spyUsedDevice,
        };
      };

      authProvider = jest.spyOn(firebase, 'auth').mockImplementation(auth);
      authProvider.GoogleAuthProvider = class GoogleAuthProvider {};
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    test('it should call firebase to create the new user', async () => {
      await Authentication.googleAuth();

      expect(firebase.auth).toHaveBeenCalledTimes(2);
      expect(spySigninWP).toHaveBeenCalledWith(new authProvider.GoogleAuthProvider());
    });

    test('it should throw an error if the user creation fails', async () => {
      spySigninWP.mockImplementation(
        () =>
          new Promise(() => {
            throw new Error();
          })
      );

      let error = null;

      try {
        await Authentication.googleAuth();
      } catch (e) {
        error = e;
      }

      expect(spyUsedDevice).toHaveBeenCalledWith();
      expect(error instanceof Error).toBe(true);
    });
  });

  describe('twitterAuth', () => {
    let spyUsedDevice = jest.fn();
    let spySigninWP = jest.fn().mockImplementation(() => new Promise((resolve) => resolve()));
    let authProvider;
    beforeEach(() => {
      const auth = function() {
        return {
          signInWithPopup: spySigninWP,
          useDeviceLanguage: spyUsedDevice,
        };
      };

      authProvider = jest.spyOn(firebase, 'auth').mockImplementation(auth);
      authProvider.TwitterAuthProvider = class TwitterAuthProvider {};
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    test('it should call firebase to create the new user', async () => {
      await Authentication.twitterAuth();

      expect(firebase.auth).toHaveBeenCalledTimes(2);
      expect(spySigninWP).toHaveBeenCalledWith(new authProvider.TwitterAuthProvider());
    });

    test('it should throw an error if the user creation fails', async () => {
      spySigninWP.mockImplementation(
        () =>
          new Promise(() => {
            throw new Error();
          })
      );

      let error = null;

      try {
        await Authentication.twitterAuth();
      } catch (e) {
        error = e;
      }

      expect(spyUsedDevice).toHaveBeenCalledWith();
      expect(error instanceof Error).toBe(true);
    });
  });

  describe('signin', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    test('it should call firebase to authenticate the user', async () => {
      const spySignin = jest.fn().mockImplementation(() => new Promise((resolve) => resolve()));
      jest.spyOn(firebase, 'auth').mockImplementation(() => ({ signInWithEmailAndPassword: spySignin }));

      await Authentication.signin('email', 'password');
      expect(firebase.auth).toHaveBeenCalledTimes(1);
      expect(spySignin).toBeCalledWith('email', 'password');
    });

    test('it should throw an error if the user creation fails', async () => {
      jest.spyOn(firebase, 'auth').mockImplementation(() => ({
        signInWithEmailAndPassword: () =>
          new Promise(() => {
            throw new Error('test');
          }),
      }));

      let error = null;

      try {
        await Authentication.signin('test', 'test');
      } catch (e) {
        error = e;
      }

      expect(error instanceof Error).toBe(true);
    });
  });
});
