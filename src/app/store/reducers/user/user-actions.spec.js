import Authentication from '@services/authentication';
import * as actions from './user-actions';
​
describe('actions', () => {
  it('should create an action to store user info when logged in', () => {
    const userInfos = {user: 'toto'};
    const expectedAction = {
      type: actions.TypeKeys.USER_LOGIN_SUCCESS,
      userInfos
    }
    expect(actions.userLoginSuccess(userInfos)).toEqual(expectedAction)
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

  describe('userCreationStart', () => {
    it('should return an async function when called', () => {
      expect(typeof actions.userCreation() === 'function').toEqual(true);
    });

    it('should dispatch userCreationStart action and then a userCreationSuccess if the user creation worked', async () => {
      const dispatchSpy = jest.fn();
      const AuthSpy = jest.spyOn(Authentication, 'createUser').mockImplementation(() => undefined);
      await actions.userCreation()(dispatchSpy);
      expect(AuthSpy).toHaveBeenCalled();
      expect(dispatchSpy).toHaveBeenNthCalledWith(1, {type: actions.TypeKeys.USER_CREATION_START});
      expect(dispatchSpy).toHaveBeenNthCalledWith(2, {type: actions.TypeKeys.USER_CREATION_SUCCESS });
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
})