import { shallow } from 'enzyme';
import React from 'react';
import SubscribeStep from './SubscribeStep';

let wrapper;

const setup = () => shallow(<SubscribeStep />);

describe('<SubscribeStep />', () => {
  test('should render properly', () => {
    wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
