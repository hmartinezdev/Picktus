import { shallow } from 'enzyme';
import React from 'react';
import ButtonLink from './ButtonLink';

let wrapper;
const baseProps = { onClick: () => undefined, href: '' };
const setup = (props = {}) => shallow(<ButtonLink {...baseProps} {...props} />);

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

  test('should render with dark mode', () => {
    wrapper = setup({ dark: true });
    expect(wrapper).toMatchSnapshot();
  });

  test('should render children if there is one', () => {
    wrapper = shallow(
      <ButtonLink {...baseProps}>
        <div />
      </ButtonLink>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
