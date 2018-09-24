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
    expect(spy).toBeCalledWith({ open: true });
  });

  describe('pushError', () => {
    test('it should add an error to the state', () => {
      const instance = mountWrapper.instance();
      const spy = jest.spyOn(instance, 'setState');
      instance.pushError('test', 'test');
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenLastCalledWith({ errorCount: 1, errors: { test: 'test' } });
    });

    test('if error already exist, it should do nothing', () => {
      const instance = mountWrapper.instance();
      instance.setState({ errorCount: 1, errors: { test: 'test' } });
      const spy = jest.spyOn(instance, 'setState');
      instance.pushError('test', 'test');
      expect(spy).toHaveBeenCalledTimes(0);
    });
  });

  describe('removeError', () => {
    test('it should remove an error from the component state', () => {
      const instance = mountWrapper.instance();
      instance.setState({ errorCount: 1, errors: { test: 'test' } });
      const spy = jest.spyOn(instance, 'setState');
      instance.removeError('test');
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith({ errorCount: 0, errors: { test: '' } });
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
});
