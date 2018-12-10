import reducer from './message-reducer'
import { TypeKeys as DisplayType } from '../display/display-actions'
import { TypeKeys as UserType } from '../user/user-actions';
import { TypeKeys as MessageType } from './message-actions';
​
describe('todos reducer', () => {
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
})