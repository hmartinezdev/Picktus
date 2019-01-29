import { shallow } from 'enzyme';
import React from 'react';
import FormPagination from './FormPagination';

let wrapper;

const setup = () => shallow(<FormPagination />);

describe('<FormPagination />', () => {
  test('should render properly', () => {
    wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
