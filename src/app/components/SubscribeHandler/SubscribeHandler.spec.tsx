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
});
