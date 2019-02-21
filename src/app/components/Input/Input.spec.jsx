import enzyme, { shallow } from 'enzyme';
import React from 'react';
import Input from './Input';

let wrapper;

const baseProps = { onChange: () => undefined };
const setup = (props = baseProps) => shallow(<Input {...props} />);

describe('<Input />', () => {
  beforeEach(() => {
    wrapper = setup();
  });

  test('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should display the correct text', () => {
    wrapper = setup({ ...baseProps, type: 'password' });
    expect(wrapper).toMatchSnapshot();
  });

  test('should display the correct placeholder', () => {
    wrapper = setup({ ...baseProps, placeholder: 'placeholder' });
    expect(wrapper).toMatchSnapshot();
  });

  test('should call onChange when a value is entered', () => {
    const onChange = jest.fn();
    const event = { target: { name: 'change', value: 'test' } };
    wrapper = setup({ onChange, placeholder: 'placeholder' });
    wrapper.find('input').simulate('change', event);
    expect(onChange).toHaveBeenCalled();
  });

  test('should have a default function onEnter', () => {
    wrapper = setup();
    expect(wrapper.instance().props.onEnter()).toEqual(undefined);
  });
});
