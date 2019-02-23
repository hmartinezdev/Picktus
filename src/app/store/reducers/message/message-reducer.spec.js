import reducer from './message-reducer'
import { TypeKeys as DisplayType } from '../display/display-actions'
import { TypeKeys as UserType } from '../user/user-actions';
import { TypeKeys as MessageType } from './message-actions';
import * as UserMessageReducer from './user';
import * as MessageGenerator from './message-generator';
import { PicktusMessageLevel } from './message.type';
​
describe('todos reducer', () => {
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

  it(`it should handle ${MessageType.MESSAGE_DISMISS_NOTIFICATION}`, () => {
    expect(reducer({notifications:[1 ,2 ,3]}, {type:MessageType.MESSAGE_DISMISS_NOTIFICATION})).toEqual({notifications: [2,3]});
  });

  it(`it should handle ${MessageType.MESSAGE_DISMISS_SNACKBAR}`, () => {
    expect(reducer({snackbars:[1 ,2 ,3]}, {type:MessageType.MESSAGE_DISMISS_SNACKBAR})).toEqual({snackbars: [2,3]});
  });

  it(`it should handle ${MessageType.MESSAGE_DISPLAY_NOTIFICATION}`, () => {
    const spy = jest.spyOn(MessageGenerator, 'default').mockImplementation(() => 'notification');
    expect(reducer({notifications:[]}, {type:MessageType.MESSAGE_DISPLAY_NOTIFICATION,  message: 'test', level: PicktusMessageLevel.INFO})).toEqual({notifications: ['notification']});
    expect(spy).toHaveBeenCalledWith('test', PicktusMessageLevel.INFO);
  });

  it(`it should handle ${MessageType.MESSAGE_DISPLAY_SNACKBAR}`, () => {
    const spy = jest.spyOn(MessageGenerator, 'default').mockImplementation(() => 'snackbar');
    expect(reducer({snackbars:[]}, {type:MessageType.MESSAGE_DISPLAY_SNACKBAR, message: 'test', level: PicktusMessageLevel.INFO})).toEqual({snackbars: ['snackbar']});
    expect(spy).toHaveBeenCalledWith('test', PicktusMessageLevel.INFO);
  });

  it(`it should handle all User actions type`, () => {
    const fakereturn = {reduced: true};
    const spy = jest.spyOn(UserMessageReducer, 'default').mockImplementation(() => fakereturn);

    expect(reducer({}, {type: UserType.USER_CREATION_FAILURE})).toEqual(fakereturn);
    expect(reducer({}, {type: UserType.USER_CREATION_START})).toEqual(fakereturn);
    expect(reducer({}, {type: UserType.USER_CREATION_SUCCESS})).toEqual(fakereturn);
    expect(reducer({}, {type: UserType.USER_LOGIN_FAILURE})).toEqual(fakereturn);
    expect(reducer({}, {type: UserType.USER_LOGIN_START})).toEqual(fakereturn);
    expect(reducer({}, {type: UserType.USER_LOGIN_SUCCESS})).toEqual(fakereturn);
    expect(reducer({}, {type: UserType.USER_LOGOUT})).toEqual(fakereturn);
    expect(reducer({}, {type: UserType.USER_SERVER_AUTH})).toEqual(fakereturn);
    
  });
})