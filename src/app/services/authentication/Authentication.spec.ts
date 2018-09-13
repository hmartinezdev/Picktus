import firebase from 'firebase/app';
import Authentication from './';

describe('Authentication service', () => {
  describe('createUser', () => {
    beforeEach(() => {
      jest
        .spyOn(firebase, 'auth')
        .mockImplementation(() => ({ createUserWithEmailAndPassword: () => new Promise((resolve) => resolve()) }));
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    test('it should call firebase to create the new user', async () => {
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
});
