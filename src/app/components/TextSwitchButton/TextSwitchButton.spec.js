import { shallow } from 'enzyme';
import React from 'react';
import TextSwitchButton from './TextSwitchButton';

let wrapper;
const basicProps = {
  onClick: () => {},
  activeText: 'testactive',
  initialText: 'testinitial',
};

const setup = (props = basicProps) => shallow(<TextSwitchButton {...basicProps} {...props} />);

describe('<TextSwitchButton />', () => {
  beforeEach(() => {
    wrapper = setup();
  });

  test('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('it should render the second text properly', () => {
    wrapper.setState({ active: true });
    expect(wrapper).toMatchSnapshot();
  });

  describe('onClick', () => {
    test('it should toggle active value', () => {
      const mock = jest.fn();
      wrapper = setup({ onClick: mock });
      const instance = wrapper.instance();
      const spy = jest.spyOn(instance, 'setState');
      instance.onClick();
      expect(spy).toHaveBeenCalledWith({ active: true });
      expect(mock).toHaveBeenCalled();
    });
  });
});
