import * as actions from './display-actions';
describe('actions', () => {
  it('should create an action to hide or display the global loader', () => {
    const show = true;
    const expectedAction = {
      show,
      type: actions.TypeKeys.DISPLAY_LOADER,
    };
    expect(actions.displayLoader(true)).toEqual(expectedAction);
  });
});
