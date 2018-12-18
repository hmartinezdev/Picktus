import enzyme, { shallow, mount } from 'enzyme';
import React from 'react';
import LoginHandler from './LoginHandler';
import { SigninMethods } from '@services/authentication';

let wrapper;
let mountWrapper;

const setup = (props = {}) => shallow(<LoginHandler {...props} />);
const mountSetup = (props = {}) => mount(<LoginHandler {...props} />);

describe('<LoginHandler />', () => {
  beforeEach(() => {
    wrapper = setup();
  });

  test('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('onChange', () => {
    test('it should change the input value in the component state', () => {
      const instance = wrapper.instance();
      const spy = jest.spyOn(instance, 'setState');
      instance.onChange({ target: { name: 'test', value: 'test' } });
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith({ inputs: { test: 'test' } });
    });

    test('it should not change the input value if the name is open', () => {
      const instance = wrapper.instance();
      const spy = jest.spyOn(instance, 'setState');
      instance.onChange({ target: { name: 'open', value: 'test' } });
      expect(spy).toHaveBeenCalledTimes(0);
    });
  });

  describe('login', () => {
    const spyLogin = jest.fn();
    let instance;

    beforeEach(() => {
      wrapper = setup({ signin: spyLogin });
      instance = wrapper.instance();
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    test('onLoginClick should call the signin method in props with methods.CLASSIC and password and email as options', () => {
      instance.setState({ inputs: { password: 'test', email: 'mail' } });
      instance.onLoginClick();
      expect(spyLogin).toHaveBeenCalledWith(SigninMethods.CLASSIC, { password: 'test', email: 'mail' });
    });

    test('onGoogleClick should call the signin method in props with methods.GOOGLE ', () => {
      instance.onGoogleClick();
      expect(spyLogin).toHaveBeenCalledWith(SigninMethods.GOOGLE, {});
    });

    test('onFacebookClick should call the signin method in props with methods.FACEBOOK ', () => {
      instance.onFacebookClick();
      expect(spyLogin).toHaveBeenCalledWith(SigninMethods.FACEBOOK, {});
    });

    test('onTwitterClick should call the signin method in props with methods.TWITTER ', () => {
      instance.onTwitterClick();
      expect(spyLogin).toHaveBeenCalledWith(SigninMethods.TWITTER, {});
    });
  });
});
