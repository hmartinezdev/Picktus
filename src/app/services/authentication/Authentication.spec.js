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
