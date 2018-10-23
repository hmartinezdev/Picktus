import { mount, shallow } from 'enzyme';
import React from 'react';
import Button, { ButtonPropTypes } from './Button';

let wrapper;
const baseProps = { onClick: () => undefined };
const setup = (props = baseProps) => shallow(<Button {...props} />);
const mountSetup = (props = baseProps) => mount(<Button {...props} />);

describe('<Button />', () => {
  test('should render properly', () => {
    wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  test('should put the text props inside the button', () => {
    wrapper = setup({ onClick: () => undefined, text: 'test' });
    expect(wrapper).toMatchSnapshot();
  });

  test('should put the onClick props on the button', () => {
    wrapper = setup({ onClick: () => undefined });
    expect(wrapper).toMatchSnapshot();
  });

  test('click on the button should call the onClick props', () => {
    const onClick = jest.fn();
    wrapper = setup({ onClick });
    wrapper.find('button').simulate('click');
    expect(onClick).toHaveBeenCalled();
  });
});
