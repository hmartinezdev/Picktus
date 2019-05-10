import { mount, shallow } from 'enzyme';
import React from 'react';
import Input from './Input';

let wrapper: any;

const baseProps = { onChange: () => undefined };
const setup = (props = {}) => shallow(<Input {...baseProps} {...props} />);
const mountSetup = (props = {}) => mount(<Input {...baseProps} {...props} />);

describe('<Input />', () => {
  beforeEach(() => {
    wrapper = setup();
  });

  afterEach(() => {
    jest.restoreAllMocks();
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

  describe('componentDidMount', () => {
    test('it should call window.addEventListener with the correct parameters', () => {
      wrapper = mountSetup();
      const instance = wrapper.instance();
      const spy = jest.spyOn(instance.input, 'addEventListener').mockImplementation(() => undefined);
      instance.componentDidMount();
      expect(spy).toBeCalledWith('keyup', instance.enterCallBack);
    });
  });

  describe('enterCallBack', () => {
    test('it should call onEnter props if the enter key has been pushed', () => {
      const onEnter = jest.fn();
      wrapper = setup({ onEnter });
      const instance = wrapper.instance();
      instance.enterCallBack({ keyCode: 13 });
      expect(onEnter).toHaveBeenCalled();
    });

    test("it should not call onEnter props if the enter key hasn't been pushed", () => {
      const onEnter = jest.fn();
      wrapper = setup({ onEnter });
      const instance = wrapper.instance();
      instance.enterCallBack({ keyCode: 3 });
      expect(onEnter).toHaveBeenCalledTimes(0);
    });
  });
});
