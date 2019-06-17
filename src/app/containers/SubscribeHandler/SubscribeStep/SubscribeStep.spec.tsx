import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import SubscribeStep from './SubscribeStep';

let wrapper: ShallowWrapper<{}, {}, SubscribeStep>;
const baseProps = {
  control: () => true,
  current: 0,
  displaySnackBar: () => undefined,
  errorMessage: 'error',
  name: 'step',
  onPreviousClick: () => undefined,
  onValidate: () => undefined,
  title: 'stepTitle',
  type: 'text',
};
const setup = (props = {}): ShallowWrapper<{}, {}, SubscribeStep> =>
  shallow(<SubscribeStep {...baseProps} {...props} />);

describe('<SubscribeStep />', () => {
  test('should render properly', () => {
    wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  describe('onSubmit', () => {
    test('it should call onValidate if control returns true', () => {
      const control = jest.fn().mockImplementation(() => true);
      const onValidate = jest.fn().mockImplementation(() => undefined);
      wrapper = setup({ control, onValidate });
      wrapper.setState({ [baseProps.name]: 'test' });
      wrapper.instance().onSubmit();
      expect(control).toHaveBeenCalledWith('test');
      expect(onValidate).toHaveBeenCalledWith('test', baseProps.name);
    });

    test('it should call onValidate if control returns true', () => {
      const control = jest.fn().mockImplementation(() => false);
      const displaySnackBar = jest.fn().mockImplementation(() => undefined);
      wrapper = setup({ control, displaySnackBar });
      wrapper.setState({ [baseProps.name]: 'test' });
      wrapper.instance().onSubmit();
      expect(control).toHaveBeenCalledWith('test');
      expect(displaySnackBar).toHaveBeenCalledWith('error', 'ERROR');
    });
  });

  describe('onNextClick', () => {
    test('it should call onSubmit', () => {
      wrapper = setup();
      const instance = wrapper.instance();
      const spy = jest.spyOn(instance, 'onSubmit');
      instance.onNextClick();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onPreviousClick', () => {
    test('it should do nothing if current is < 1', () => {
      const spy = jest.fn();
      wrapper = setup({ current: 0, onPreviousClick: spy });
      const instance = wrapper.instance();
      instance.onPreviousClick();
      expect(spy).toHaveBeenCalledTimes(0);
    });

    test('it should call onPreviousClick prop if current is >= 1', () => {
      const spy = jest.fn();
      wrapper = setup({ current: 1, onPreviousClick: spy });
      const instance = wrapper.instance();
      instance.onPreviousClick();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onChange', () => {
    test('it should call setState with the correct parameters', () => {
      wrapper = setup();
      const instance = wrapper.instance();
      const spy = jest.spyOn(instance, 'setState');
      instance.onChange({
        target: {
          addEventListener: () => undefined,
          dispatchEvent: () => true,
          name: baseProps.name,
          removeEventListener: () => undefined,
          value: 'test',
        },
      } as any);
      expect(spy).toHaveBeenCalledWith({ [baseProps.name]: 'test' });
    });
  });
});
