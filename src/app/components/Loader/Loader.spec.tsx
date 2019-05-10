import { shallow } from 'enzyme';
import React from 'react';
import Loader from './Loader';

let wrapper;

const setup = () => shallow(<Loader />);

describe('<Loader />', () => {
  test('should render properly', () => {
    wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
