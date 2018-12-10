import * as actions from './message-actions';
​
describe('actions', () => {
  it('should create an action to dismiss a notification', () => {
    const expectedAction = {
      type: actions.TypeKeys.MESSAGE_DISMISS_NOTIFICATION,
    }

    expect(actions.dismissNotification()).toEqual(expectedAction);
  });

  it('should create an action to dismiss a snackbar', () => {
   
    const expectedAction = {
      type: actions.TypeKeys.MESSAGE_DISMISS_SNACKBAR,
    }
    expect(actions.dismissSnackBar(true)).toEqual(expectedAction);
  })
});