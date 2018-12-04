import { shallow } from 'enzyme';
import React from 'react';
import NotificationsHandler from './NotificationsHandler';

let wrapper;

const setup = () => shallow(<NotificationsHandler />);

describe('<NotificationsHandler />', () => {
  test('should render properly', () => {
    wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
