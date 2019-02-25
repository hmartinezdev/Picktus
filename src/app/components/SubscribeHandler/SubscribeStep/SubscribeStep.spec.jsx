import { shallow } from 'enzyme';
import React from 'react';
import SubscribeStep from './SubscribeStep';

let wrapper;
const baseProps = {
  onValidate: () => undefined,
  control: () => true,
  errorMessage: 'error',
  name: 'step',
  title: 'stepTitle',
  displaySnackBar: () => undefined,
  type: 'text',
};
const setup = (props = {}) => shallow(<SubscribeStep {...baseProps} {...props} />);

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
      const instance = wrapper.instance();
      wrapper.setState({ [baseProps.name]: 'test' });
      wrapper.instance().onSubmit();
      expect(control).toHaveBeenCalledWith('test');
      expect(onValidate).toHaveBeenCalledWith('test', baseProps.name);
    });

    test('it should call onValidate if control returns true', () => {
      const control = jest.fn().mockImplementation(() => false);
      const displaySnackBar = jest.fn().mockImplementation(() => undefined);
      wrapper = setup({ control, displaySnackBar });
      const instance = wrapper.instance();
      wrapper.setState({ [baseProps.name]: 'test' });
      wrapper.instance().onSubmit();
      expect(control).toHaveBeenCalledWith('test');
      expect(displaySnackBar).toHaveBeenCalledWith('error', 'ERROR');
    });
  });

  describe('onChange', () => {
    test('it should call setState with the correct parameters', () => {
      wrapper = setup();
      const instance = wrapper.instance();
      const spy = jest.spyOn(instance, 'setState');
      instance.onChange({ target: { name: baseProps.name, value: 'test' } });
      expect(spy).toHaveBeenCalledWith({ [baseProps.name]: 'test' });
    });
  });
});
