import { shallow } from 'enzyme';
import React from 'react';
import GlobalLoader from './GlobalLoader';

let wrapper;

const setup = () => shallow(<GlobalLoader />);

describe('<GlobalLoader />', () => {
  test('should render properly', () => {
    wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
