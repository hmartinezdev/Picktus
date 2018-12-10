import { shallow } from 'enzyme';
import React from 'react';
import Messages from './Messages';

let wrapper;
const baseProps = {
  notifications: [],
  snackbars: [],
};

const setup = (props = baseProps) => shallow(<Messages {...props} />);

describe('<MessageHandler />', () => {
  test('should render properly', () => {
    wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
