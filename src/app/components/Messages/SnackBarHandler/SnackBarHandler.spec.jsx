import { shallow } from 'enzyme';
import React from 'react';
import SnackBarHandler from './SnackBarHandler';

let wrapper;

const setup = (props = {}) => shallow(<SnackBarHandler {...props} />);

describe('<SnackBarHandler />', () => {
  test('should render properly', () => {
    wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  test('should render with snackbars defined', () => {
    const spyDissmiss = jest.fn();
    wrapper = setup({ snackbars: [{ id: 'ok' }], dismissSnackBar: spyDissmiss });
    expect(wrapper).toMatchSnapshot();
  });

  describe('dismissSnackBar', () => {
    test('it should set a timeout to dismiss the current snackbar if there is at least a snackbar', () => {
      const spyTimeOut = jest.spyOn(window, 'setTimeout').mockImplementation((fn) => fn());
      const spyDissmiss = jest.fn();
      wrapper = setup({ snackbars: [{ id: 'ok' }], dismissSnackBar: spyDissmiss });

      expect(spyTimeOut).toHaveBeenCalledWith(spyDissmiss, 2000);
      expect(spyDissmiss).toHaveBeenCalled();
    });
  });

  describe('componentDidUpdate', () => {
    test('it should call dismissSnackBar if there is still a new snackbar to be displayed', () => {
      const spyTimeOut = jest.spyOn(window, 'setTimeout').mockImplementation((fn) => fn());
      const spyDissmiss = jest.fn();
      wrapper = setup({ snackbars: [{ id: 'ok' }, { id: 'test' }], dismissSnackBar: spyDissmiss });
      wrapper.instance().componentDidUpdate({ snackbars: [{ id: 'test' }], dismissSnackBar: spyDissmiss });

      expect(spyDissmiss).toHaveBeenCalledTimes(2);
    });
  });
});
