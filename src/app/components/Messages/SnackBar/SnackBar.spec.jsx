import { shallow } from 'enzyme';
import React from 'react';
import SnackBar from './SnackBar';

let wrapper;

const setup = () => shallow(<SnackBar />);

describe('<SnackBar />', () => {
  test('should render properly', () => {
    wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
