import { mount, shallow } from 'enzyme';
import React from 'react';
import ButtonLink from './ButtonLink';

let wrapper;
const baseProps = { onClick: () => undefined };
const setup = (props = baseProps) => shallow(<ButtonLink {...props} />);
const mountSetup = (props = baseProps) => mount(<ButtonLink {...props} />);

describe('<Button />', () => {
  test('should render properly', () => {
    wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  test('should put the text props inside the button', () => {
    wrapper = setup({ href: '', text: 'test' });
    expect(wrapper).toMatchSnapshot();
  });

  test('should put the href props on the button', () => {
    wrapper = setup({ href: '/test' });
    expect(wrapper).toMatchSnapshot();
  });
});
