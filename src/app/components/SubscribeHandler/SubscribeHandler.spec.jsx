import Authentication from '@services/authentication';
import { mount, shallow } from 'enzyme';
import React from 'react';
import SubscribeHandler from './SubscribeHandler';

let wrapper;
let instance;
let mountWrapper;

const baseProps = {
  requestStatus: {
    inProgress: false,
    error: 'error',
  },
};

const setup = (props = {}) => shallow(<SubscribeHandler {...baseProps} {...props} />);

describe('<SubscribeHandler />', () => {
  beforeEach(() => {
    wrapper = setup();
    instance = wrapper.instance();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('componentWillReceiveProps', () => {
    test('it should call setState with current at 0 if the user creation progress has finished', () => {
      wrapper = setup({ requestStatus: { inProgress: true } });
      const spy = jest.spyOn(wrapper, 'setState');
      wrapper.setProps({ requestStatus: { inProgress: false } });
      expect(spy).toHaveBeenCalledWith({ current: 0 });
    });
  });

  describe('confirmPassWord', () => {
    test('it should return true if the password value is equal to the confirmation', () => {
      wrapper.setState({ values: { password: 'test' } });
      instance = wrapper.instance();
      expect(instance.confirmPassword('test')).toBe(true);
    });

    test('it should return false if not', () => {
      wrapper.setState({ values: { password: 'test' } });
      instance = wrapper.instance();
      expect(instance.confirmPassword('test1')).toBe(false);
    });
  });

  describe('onValidate', () => {
    test('it should call onLastValueSubmitted if current is equal to the number of steps minus 1', () => {
      wrapper = setup({ userCreation: () => undefined });
      instance = wrapper.instance();
      instance.setState({ current: instance.form.length - 1 });
      const spy = jest.spyOn(instance, 'onLastValueSubmitted');
      instance.onValidate();
      expect(spy).toHaveBeenCalled();
    });

    test("it should increment current value and store the value in the component state if it's not", () => {
      const spy = jest.spyOn(instance, 'setState');
      instance.onValidate('test');
      expect(spy).toBeCalledWith({ current: 1, values: { [instance.form[0].name]: 'test' } });
    });
  });

  describe('onLastValueSubmitted', () => {
    test('it should call userCreation with the defined password and email', () => {
      const userCreation = jest.fn();
      wrapper = setup({ userCreation });
      wrapper.setState({ values: { password: 'password', mail: 'mail' } });
      instance = wrapper.instance();
      instance.onLastValueSubmitted();
      expect(userCreation).toHaveBeenCalledWith('mail', 'password');
    });
  });

  describe('onValidatedStepClick', () => {
    test('it should set the state to the clicked step', () => {
      const spy = jest.spyOn(instance, 'setState');
      instance.onValidatedStepClick(1);
      expect(spy).toHaveBeenCalledWith({ current: 1 });
    });
  });
});
