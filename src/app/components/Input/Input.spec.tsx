import enzyme, { shallow } from 'enzyme';
import React from 'react';
import Input from './Input';

let wrapper: enzyme.ShallowWrapper;

const setup = (props = {}) => shallow(<Input {...props} />);

describe('<Input />', () => {
  beforeEach(() => {
    wrapper = setup();
  });

  test('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should display the correct text', () => {
    wrapper = setup({ type: 'password' });
    expect(wrapper).toMatchSnapshot();
  });

  test('should display the correct placeholder', () => {
    wrapper = setup({ placeholder: 'placeholder' });
    expect(wrapper).toMatchSnapshot();
  });
});
