import Authentication, { SigninMethods } from '@services/authentication';
import * as actions from './user-actions';
​
describe('actions', () => {
  it('should create an action to store user info when logged in', () => {
    const user = { 
      email:'ok',
      emailVerified: true,
      name: 'hugo',
      photoUrl: 'url',
      uid: 'id'
    };

    const expectedAction = {
      type: actions.TypeKeys.USER_LOGIN_SUCCESS,
      user
    }
    expect(actions.userLoginSuccess(user)).toEqual(expectedAction)
  })

  it('should create an action to display an error when logging failed', () => {
    const error = new Error();
    const expectedAction = {
      type: actions.TypeKeys.USER_LOGIN_FAILURE,
      error
    }
    expect(actions.userLoginFailure(error)).toEqual(expectedAction)
  })

  it('should create an action to indicate that user creation started', () => {
    const expectedAction = {
      type: actions.TypeKeys.USER_CREATION_START,
    }
    expect(actions.userCreationStart()).toEqual(expectedAction)
  })

  it('should create an action to store user info when user creation succeeded', () => {
    const expectedAction = {
      type: actions.TypeKeys.USER_CREATION_SUCCESS,
    }
    expect(actions.UserCreationSuccess()).toEqual(expectedAction)
  })

  it('should create an action to display an error when user creation failed', () => {
    const error = 'test'
    const expectedAction = {
      type: actions.TypeKeys.USER_CREATION_FAILURE,
      error
    }
    expect(actions.userCreationFailure(error)).toEqual(expectedAction)
  })

  describe('userCreation', () => {
    it('should return an async function when called', () => {
      expect(typeof actions.userCreation() === 'function').toEqual(true);
    });

    it('should dispatch userCreationStart action and then a userCreationSuccess if the user creation worked', async () => {
      const dispatchSpy = jest.fn();
      const AuthSpy = jest.spyOn(Authentication, 'createUser').mockImplementation(() => undefined);
      await actions.userCreation()(dispatchSpy);
      expect(AuthSpy).toHaveBeenCalled();
      expect(dispatchSpy).toHaveBeenNthCalledWith(1, {type: actions.TypeKeys.USER_CREATION_START});
    });


    it('should dispatch userCreationStart action and then a userCreationFailure if the user creation failed', async  () => {
      const dispatchSpy = jest.fn();
      const error = new Error('test');
      const AuthSpy = jest.spyOn(Authentication, 'createUser').mockImplementation(() => {
        throw error
      });
      await actions.userCreation()(dispatchSpy);
      expect(AuthSpy).toHaveBeenCalled();
      expect(dispatchSpy).toHaveBeenNthCalledWith(1, {type: actions.TypeKeys.USER_CREATION_START});
      expect(dispatchSpy).toHaveBeenNthCalledWith(2, {type: actions.TypeKeys.USER_CREATION_FAILURE, error });
    });

  });

  describe('signin', () => {
    it('should return an async function when called', () => {
      expect(typeof actions.signin() === 'function').toEqual(true);
    });

    it('should dispatch userLoginStart and userLoginSuccess if signin method is CLASSIC', async () => {
      const dispatchSpy = jest.fn();
      const AuthSpy = jest.spyOn(Authentication, 'signin').mockImplementation(() => ( {test: 'test'} ));
      await actions.signin(SigninMethods.CLASSIC)(dispatchSpy);
      expect(AuthSpy).toHaveBeenCalled();
      expect(dispatchSpy).toHaveBeenNthCalledWith(1, {type: actions.TypeKeys.USER_LOGIN_START});
      expect(dispatchSpy).toHaveBeenNthCalledWith(2, {type: actions.TypeKeys.USER_LOGIN_SUCCESS, user: {test: 'test'}});
    });

    describe('should dispatch userLoginSuccess if signin method is delegated', () => {
      it('with google auth', async () => {
        const dispatchSpy = jest.fn();
        const AuthSpy = jest.spyOn(Authentication, 'signin').mockImplementation(() => ( {test: 'test'} ));
        await actions.signin(SigninMethods.GOOGLE)(dispatchSpy);
        expect(AuthSpy).toHaveBeenCalled();
        expect(dispatchSpy).toHaveBeenNthCalledWith(1, {type: actions.TypeKeys.USER_LOGIN_SUCCESS, user:{test: 'test'}});
      });

      it('with Facebook auth', async () => {
        const dispatchSpy = jest.fn();
        const AuthSpy = jest.spyOn(Authentication, 'signin').mockImplementation(() => ( {test: 'test'} ));
        await actions.signin(SigninMethods.FACEBOOK)(dispatchSpy);
        expect(AuthSpy).toHaveBeenCalled();
        expect(dispatchSpy).toHaveBeenNthCalledWith(1, {type: actions.TypeKeys.USER_LOGIN_SUCCESS, user:{test: 'test'}});
      });

      it('with twitter auth', async () => {
        const dispatchSpy = jest.fn();
        const AuthSpy = jest.spyOn(Authentication, 'signin').mockImplementation(() => ( {test: 'test'} ));
        await actions.signin(SigninMethods.TWITTER)(dispatchSpy);
        expect(AuthSpy).toHaveBeenCalled();
        expect(dispatchSpy).toHaveBeenNthCalledWith(1, {type: actions.TypeKeys.USER_LOGIN_SUCCESS, user:{test: 'test'}});
      });
    });

    it('should dispatch userLoginFailure if the user login failed', async  () => {
      const dispatchSpy = jest.fn();
      const error = new Error('test');
      const AuthSpy = jest.spyOn(Authentication, 'signin').mockImplementation(() => {
        throw error;
      });
      await actions.signin(SigninMethods.GOOGLE)(dispatchSpy);
      expect(AuthSpy).toHaveBeenCalled();
      expect(dispatchSpy).toHaveBeenNthCalledWith(1, {type: actions.TypeKeys.USER_LOGIN_FAILURE, error });
    });

  });

})