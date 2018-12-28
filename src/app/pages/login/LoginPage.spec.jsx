import { shallow } from 'enzyme';
import React from 'react';
import LoginPage from './LoginPage';

let wrapper;

const setup = () => shallow(<LoginPage />);

describe('<LoginPage />', () => {
  test('should render properly', () => {
    wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
