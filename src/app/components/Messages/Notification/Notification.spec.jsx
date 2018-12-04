import { shallow } from 'enzyme';
import React from 'react';
import Notification from './Notification';

let wrapper;

const setup = () => shallow(<Notification />);

describe('<Notification />', () => {
  test('should render properly', () => {
    wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
