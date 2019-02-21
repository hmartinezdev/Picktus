import reducer from './display-reducer'
import { TypeKeys as DisplayType } from './display-actions'
import { TypeKeys as UserType } from '../user/user-actions';
​
describe('display reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
        { loader: false }
    );
  });

  it('should return the initial state set in the parameters', () => {
    expect(reducer({}, {})).toEqual(
        {}
    );
  });

  it(`it should handle ${DisplayType.DISPLAY_LOADER}`, () => {
    expect(reducer(undefined, {type:DisplayType.DISPLAY_LOADER, show: true})).toEqual({loader: true});
  });
})