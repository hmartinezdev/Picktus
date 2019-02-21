import { shallow } from 'enzyme';
import React from 'react';
import FormPagination from './FormPagination';

let wrapper;

const baseProps = {
  steps: ['mail', 'password'],
};

const setup = (props = {}) => shallow(<FormPagination {...baseProps} {...props} />);

describe('<FormPagination />', () => {
  test('should render properly', () => {
    wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
