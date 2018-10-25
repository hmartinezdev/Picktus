import enzyme, { shallow, mount } from 'enzyme';
import React from 'react';
import LoginHandler from './';

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

  describe('onClick', () => {
    test('it should do jack shit', () => {
      const instance = wrapper.instance();
      const result = instance.onClick();
      expect(result).toBe(undefined);
    });
  });
});
