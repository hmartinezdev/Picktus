import reducer from './user-message-reducer'
import { TypeKeys as UserType } from '../../user/user-actions';
import * as messGen from '../message-generator';
import user from '../message-reducer';
import { IMessageState, PicktusMessageDisplay, PicktusMessageLevel } from '../message.type';


let spyGenerator;​
const fakeNotif = { ok: ';fake' };
describe('user-message reducer', () => {

  beforeEach(() => {
      spyGenerator = jest.spyOn(messGen, 'default').mockImplementation(() => fakeNotif);
  });

  afterEach(() => {
      jest.restoreAllMocks();
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
        { notifications: [], snackbars: [] }
    );
  });

  it('should return the initial state set in the parameters', () => {
    expect(reducer({}, {})).toEqual(
        {}
    );
  });

  describe(`should handle ${UserType.USER_CREATION_FAILURE} actions`, () => {
    it(`and should add a notification if the error is correctly formated`, () => {
      const error = new Error();
      error.formatedMessage = 'test'
      const result = reducer(undefined, {type: UserType.USER_CREATION_FAILURE, error});
      expect(spyGenerator).toHaveBeenCalledWith(error.formatedMessage, PicktusMessageLevel.ERROR);
      expect(result.notifications.length).toEqual(1);
    }); 
    
    it(`and should do nothing if the error is not correctly formated`, () => {
      const error = new Error();
      const result = reducer(undefined, {type: UserType.USER_LOGIN_FAILURE, error});
      expect(result.notifications.length).toEqual(0);
    });
  });

  describe(`should handle ${UserType.USER_LOGIN_FAILURE} actions`, () => {
    it(`and should add a notification if the error is correctly formated`, () => {
      const error = new Error();
      error.formatedMessage = 'test'
      const result = reducer(undefined, {type: UserType.USER_LOGIN_FAILURE, error});
      expect(spyGenerator).toHaveBeenCalledWith(error.formatedMessage, PicktusMessageLevel.ERROR);
      expect(result.notifications.length).toEqual(1);
    });

    it(`and should do nothing if the error is not correctly formated`, () => {
      const error = new Error();
      const result = reducer(undefined, {type: UserType.USER_LOGIN_FAILURE, error});
      expect(result.notifications.length).toEqual(0);
    });
  });

  it(`should handle ${UserType.USER_CREATION_SUCCESS} actions`, () => {
    const result = reducer(undefined, {type: UserType.USER_CREATION_SUCCESS});
    expect(spyGenerator).toHaveBeenCalledWith('You have successfully created your account!', PicktusMessageLevel.SUCCESS);
    expect(result.notifications.length).toEqual(1);
  });

  it(`should handle ${UserType.USER_LOGIN_SUCCESS} actions`, () => {
    const result = reducer(undefined, {type: UserType.USER_LOGIN_SUCCESS});
    expect(spyGenerator).toHaveBeenCalledWith( 'You have successfully logged in!', PicktusMessageLevel.SUCCESS);
    expect(result.notifications.length).toEqual(1);
  });

  it(`should handle ${UserType.USER_LOGOUT} actions`, () => {
    const result = reducer(undefined, {type: UserType.USER_LOGOUT});
    expect(spyGenerator).toHaveBeenCalledWith( 'You have successfully logged out!', PicktusMessageLevel.SUCCESS);
    expect(result.notifications.length).toEqual(1);
  });
})