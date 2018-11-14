import * as firebase from 'firebase/app';
import Authentication, { SigninMethods } from './';

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
          await Authentication.signin(SigninMethods.CLASSIC, { email: 'email', password: '' });
        } catch (e) {
          error = e;
        }

        expect(error instanceof Error).toBe(true);
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
    });
  });
});
