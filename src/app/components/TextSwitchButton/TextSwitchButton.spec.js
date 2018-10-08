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
  test('should render properly', () => {
    wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
