import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

let wrapper;

const setup = () => shallow(<Header />);

describe('<Header />', () => {
  test('should render properly', () => {
    wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
