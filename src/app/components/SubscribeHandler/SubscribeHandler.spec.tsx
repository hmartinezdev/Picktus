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

  test('onPasswordChange', () => {
    const instance = mountWrapper.instance();
    const spy = jest.spyOn(instance, 'setState');
    instance.onPasswordChange({ target: { value: 'test' } });
    expect(spy).toBeCalledWith({ password: 'test' });
  });

  test('onMailChange', () => {
    const instance = mountWrapper.instance();
    const spy = jest.spyOn(instance, 'setState');
    instance.onMailChange({ target: { value: 'test' } });
    expect(spy).toBeCalledWith({ mail: 'test' });
  });

  test('onPasswordChange', () => {
    const instance = mountWrapper.instance();
    const spy = jest.spyOn(instance, 'setState');
    instance.onComfirmPasswordChange({ target: { value: 'test' } });
    expect(spy).toBeCalledWith({ comfirmPassword: 'test' });
  });

  test('onSubscribeClick', async () => {
    const instance = mountWrapper.instance();
    instance.setState({ password: 'test', mail: 'mail@mail' });
    const mock = jest.fn();
    Authentication.createUser = mock;
    await instance.onSubscribeClick();
    expect(mock).toBeCalledWith('mail@mail', 'test');
  });
});
