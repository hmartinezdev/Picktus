import { shallow } from 'enzyme';
import React from 'react';
import NotificationHandler from './NotificationsHandler';

let wrapper;

const setup = (props = {}) => shallow(<NotificationHandler {...props} />);

describe('<NotificationHandler />', () => {
  test('should render properly', () => {
    wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  test('should render with notifications defined', () => {
    const spyDissmiss = jest.fn();
    wrapper = setup({ notifications: [{ id: 'ok' }], dismissNotification: spyDissmiss });
    expect(wrapper).toMatchSnapshot();
  });

  describe('dismissNotification', () => {
    test('it should set a timeout to dismiss the current notification if there is at least a notification', () => {
      const spyTimeOut = jest.spyOn(window, 'setTimeout').mockImplementation((fn) => fn());
      const spyDissmiss = jest.fn();
      wrapper = setup({ notifications: [{ id: 'ok' }], dismissNotification: spyDissmiss });

      expect(spyTimeOut).toHaveBeenCalledWith(spyDissmiss, 3500);
      expect(spyDissmiss).toHaveBeenCalled();
    });
  });

  describe('componentDidUpdate', () => {
    test('it should call dismissNotification if there is still a new notification to be displayed', () => {
      const spyTimeOut = jest.spyOn(window, 'setTimeout').mockImplementation((fn) => fn());
      const spyDissmiss = jest.fn();
      wrapper = setup({ notifications: [{ id: 'ok' }, { id: 'test' }], dismissNotification: spyDissmiss });
      wrapper.instance().componentDidUpdate({ notifications: [{ id: 'test' }], dismissSnackBar: spyDissmiss });

      expect(spyDissmiss).toHaveBeenCalledTimes(2);
    });
  });
});
