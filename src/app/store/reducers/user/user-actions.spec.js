import Authentication from '@services/authentication';
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
    const error = 'test'
    const expectedAction = {
      type: actions.TypeKeys.USER_LOGIN_FAILED,
      error
    }
    expect(actions.userLoginFailed(error)).toEqual(expectedAction)
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
    expect(actions.UserCreationFailure(error)).toEqual(expectedAction)
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
      const AuthSpy = jest.spyOn(Authentication, 'createUser').mockImplementation(() => {
        throw new Error('test');
      });
      await actions.userCreation()(dispatchSpy);
      expect(AuthSpy).toHaveBeenCalled();
      expect(dispatchSpy).toHaveBeenNthCalledWith(1, {type: actions.TypeKeys.USER_CREATION_START});
      expect(dispatchSpy).toHaveBeenNthCalledWith(2, {type: actions.TypeKeys.USER_CREATION_FAILURE, "error": "test", });
    });

  });

  describe('facebookLogin', () => {
    it('should return an async function when called', () => {
      expect(typeof actions.facebookLogin() === 'function').toEqual(true);
    });

    it('should dispatch nothing if facebook auth is successfull', async () => {
      const dispatchSpy = jest.fn();
      const AuthSpy = jest.spyOn(Authentication, 'facebookAuth').mockImplementation(() => undefined);
      await actions.facebookLogin()(dispatchSpy);
      expect(AuthSpy).toHaveBeenCalled();
    });


    it('should dispatch a userLoginFailed error if the authentication failed', async  () => {
      const dispatchSpy = jest.fn();
      const AuthSpy = jest.spyOn(Authentication, 'facebookAuth').mockImplementation(() => {
        throw new Error('test');
      });
      await actions.facebookLogin()(dispatchSpy);
      expect(AuthSpy).toHaveBeenCalled();
      expect(dispatchSpy).toHaveBeenNthCalledWith(1, {type: actions.TypeKeys.USER_LOGIN_FAILED, error: 'test'});
    });
  });

  describe('googleLogin', () => {
    it('should return an async function when called', () => {
      expect(typeof actions.googleLogin() === 'function').toEqual(true);
    });

    it('should dispatch nothing if facebook auth is successfull', async () => {
      const dispatchSpy = jest.fn();
      const AuthSpy = jest.spyOn(Authentication, 'googleAuth').mockImplementation(() => undefined);
      await actions.googleLogin()(dispatchSpy);
      expect(AuthSpy).toHaveBeenCalled();
    });


    it('should dispatch a userLoginFailed error if the authentication failed', async  () => {
      const dispatchSpy = jest.fn();
      const AuthSpy = jest.spyOn(Authentication, 'googleAuth').mockImplementation(() => {
        throw new Error('test');
      });
      await actions.googleLogin()(dispatchSpy);
      expect(AuthSpy).toHaveBeenCalled();
      expect(dispatchSpy).toHaveBeenNthCalledWith(1, {type: actions.TypeKeys.USER_LOGIN_FAILED, error: 'test'});
    });
  });

  describe('twitterLogin', () => {
    it('should return an async function when called', () => {
      expect(typeof actions.twitterLogin() === 'function').toEqual(true);
    });

    it('should dispatch nothing if facebook auth is successfull', async () => {
      const dispatchSpy = jest.fn();
      const AuthSpy = jest.spyOn(Authentication, 'twitterAuth').mockImplementation(() => undefined);
      await actions.twitterLogin()(dispatchSpy);
      expect(AuthSpy).toHaveBeenCalled();
    });


    it('should dispatch a userLoginFailed error if the authentication failed', async  () => {
      const dispatchSpy = jest.fn();
      const AuthSpy = jest.spyOn(Authentication, 'twitterAuth').mockImplementation(() => {
        throw new Error('test');
      });
      await actions.twitterLogin()(dispatchSpy);
      expect(AuthSpy).toHaveBeenCalled();
      expect(dispatchSpy).toHaveBeenNthCalledWith(1, {type: actions.TypeKeys.USER_LOGIN_FAILED, error: 'test'});
    });
  });

  describe('classicLogin', () => {
    it('should return an async function when called', () => {
      expect(typeof actions.classicLogin() === 'function').toEqual(true);
    });

    it('should dispatch userLoginStart action and call signin Authentication method', async () => {
      const dispatchSpy = jest.fn();
      const AuthSpy = jest.spyOn(Authentication, 'signin').mockImplementation(() => undefined);
      await actions.classicLogin()(dispatchSpy);
      expect(AuthSpy).toHaveBeenCalled();
      expect(dispatchSpy).toHaveBeenNthCalledWith(1, {type: actions.TypeKeys.USER_LOGIN_START});
    });

    it('should dispatch userCreationStart action and then a userCreationFailure if the user creation failed', async  () => {
      const dispatchSpy = jest.fn();
      const AuthSpy = jest.spyOn(Authentication, 'signin').mockImplementation(() => {
        throw new Error('test');
      });
      await actions.classicLogin()(dispatchSpy);
      expect(AuthSpy).toHaveBeenCalled();
      expect(dispatchSpy).toHaveBeenNthCalledWith(1, {type: actions.TypeKeys.USER_LOGIN_START});
      expect(dispatchSpy).toHaveBeenNthCalledWith(2, {type: actions.TypeKeys.USER_LOGIN_FAILED, "error": "test", });
    });

  });

})