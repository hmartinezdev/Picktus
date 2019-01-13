import { shallow } from 'enzyme';
import React from 'react';
import SubscribePage from './SubscribePage';

let wrapper;

const setup = () => shallow(<SubscribePage />);

describe('<SubscribePage />', () => {
  test('should render properly', () => {
    wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
