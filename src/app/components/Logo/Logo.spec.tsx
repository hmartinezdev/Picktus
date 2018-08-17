import { shallow } from 'enzyme';
import React from 'react';
import Logo from './Logo';

let wrapper;

const setup = () => shallow(<Logo />);

describe('<Logo />', () => {
  test('should render properly', () => {
    wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
