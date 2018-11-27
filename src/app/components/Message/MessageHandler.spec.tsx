import { shallow } from 'enzyme';
import React from 'react';
import MessageHandler from './MessageHandler';

let wrapper;
const baseProps = {
  notifications: [],
  snackbars: [],
};

const setup = (props = baseProps) => shallow(<MessageHandler {...props} />);

describe('<MessageHandler />', () => {
  test('should render properly', () => {
    wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
