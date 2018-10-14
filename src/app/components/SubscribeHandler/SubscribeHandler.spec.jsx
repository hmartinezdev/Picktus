import Authentication from '@services/authentication';
import { mount, shallow } from 'enzyme';
import React from 'react';
import SubscribeHandler from './SubscribeHandler';

let wrapper;
let mountWrapper;

const mountSetup = (props = {}) => mount(<SubscribeHandler {...props} />);
const setup = (props = {}) => shallow(<SubscribeHandler {...props} />);

describe('<SubscribeHandler />', () => {
  beforeEach(() => {
    wrapper = setup();
    mountWrapper = mountSetup();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('onTriggerClick', () => {
    const instance = mountWrapper.instance();
    const spy = jest.spyOn(instance, 'setState');
    instance.onTriggerClick();
    expect(spy).toBeCalledWith({ open: true, errors: {} });
  });

  describe('pushError', () => {
    test('it should add an error to the state', () => {
      const instance = mountWrapper.instance();
      const spy = jest.spyOn(instance, 'setState');
      instance.pushError('test', 'test');
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenLastCalledWith({ errors: { test: 'test' } });
    });

    test('if error already exist, it should do nothing', () => {
      const instance = mountWrapper.instance();
      instance.setState({ errors: { test: 'test' } });
      const spy = jest.spyOn(instance, 'setState');
      instance.pushError('test', 'test');
      expect(spy).toHaveBeenCalledTimes(0);
    });
  });

  describe('removeError', () => {
    test('it should remove an error from the component state', () => {
      const instance = mountWrapper.instance();
      instance.setState({ errors: { test: 'test' } });
      const spy = jest.spyOn(instance, 'setState');
      instance.removeError('test');
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith({ errors: { test: '' } });
    });

    test('it should do nothing if the error does not exist', () => {
      const instance = mountWrapper.instance();
      const spy = jest.spyOn(instance, 'setState');
      instance.removeError('test');
      expect(spy).toHaveBeenCalledTimes(0);
    });
  });

  describe('onChange', () => {
    test('it should change the input value in the component state', () => {
      const instance = mountWrapper.instance();
      const spy = jest.spyOn(instance, 'setState');
      instance.onChange({ target: { name: 'test', value: 'test' } });
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith({ inputs: { test: 'test' } });
    });

    test('it should not change the input value if the name is open', () => {
      const instance = mountWrapper.instance();
      const spy = jest.spyOn(instance, 'setState');
      instance.onChange({ target: { name: 'open', value: 'test' } });
      expect(spy).toHaveBeenCalledTimes(0);
    });
  });

  describe('validity', () => {
    test('it should add an error if the input value is not valid', () => {
      const instance = mountWrapper.instance();
      const spyPush = jest.spyOn(instance, 'pushError');
      const spyRemove = jest.spyOn(instance, 'removeError');
      const ret = instance.validity('test', false, 'error');
      expect(spyPush).toHaveBeenCalled();
      expect(spyRemove).toHaveBeenCalledTimes(0);
      expect(spyPush).toBeCalledWith('test', 'error');
      expect(ret).toEqual(false);
    });

    test('it should remove an error if the input value is valid', () => {
      const instance = mountWrapper.instance();
      const spyPush = jest.spyOn(instance, 'pushError');
      const spyRemove = jest.spyOn(instance, 'removeError');
      const ret = instance.validity('test', true, 'error');
      expect(spyRemove).toHaveBeenCalled();
      expect(spyPush).toHaveBeenCalledTimes(0);
      expect(spyRemove).toBeCalledWith('test');
      expect(ret).toEqual(true);
    });
  });

  describe('onSubscribeClick', () => {
    test('it should call userCreation if all input values are correct', () => {
      const userCreation = jest.fn();
      const mountWrapper = mountSetup({ userCreation });
      const instance = mountWrapper.instance();
      const spyValidity = jest.spyOn(instance, 'validity');
      instance.setState({ inputs: { password: 'Kako1234!', comfirmPassword: 'Kako1234!', mail: 'hugo@mail.com' } });
      instance.onSubscribeClick();
      expect(userCreation).toHaveBeenCalled();
      expect(spyValidity).toHaveBeenCalledTimes(4);
    });

    test('if there is one or more error, it should not call userCreation', () => {
      const userCreation = jest.fn();
      const mountWrapper = mountSetup({ userCreation });
      const instance = mountWrapper.instance();
      const spyValidity = jest.spyOn(instance, 'validity');
      instance.setState({ inputs: { password: 'k!', comfirmPassword: 'Kako1234!', mail: 'hugo@mail.com' } });
      instance.onSubscribeClick();
      expect(userCreation).toHaveBeenCalledTimes(0);
      expect(spyValidity).toHaveBeenCalledTimes(2);
    });

    test('if there is a missing value it should only check that and return immediatly', () => {
      const userCreation = jest.fn();
      const mountWrapper = mountSetup({ userCreation });
      const instance = mountWrapper.instance();
      const spyValidity = jest.spyOn(instance, 'validity');
      instance.setState({ inputs: { comfirmPassword: 'Kako1234!', mail: 'hugo@mail.com' } });
      instance.onSubscribeClick();
      expect(userCreation).toHaveBeenCalledTimes(0);
      expect(spyValidity).toHaveBeenCalledTimes(1);
    });
  });

  describe('renderErrors', () => {
    test('it should return an array of element if there are errors', () => {
      const instance = mountWrapper.instance();
      instance.setState({ errors: { missingValues: 'test' } });
      const result = instance.renderErrors();
      expect(result).toHaveLength(1);
    });

    test('it should return an empty array if there are no errors', () => {
      const instance = mountWrapper.instance();
      const result = instance.renderErrors();
      expect(result).toHaveLength(0);
    });

    test('it should return an empty array if an error is not defined anymore', () => {
      const instance = mountWrapper.instance();
      instance.setState({ errors: { missingValues: undefined } });
      const result = instance.renderErrors();
      expect(result).toEqual([undefined]);
    });
  });
});
