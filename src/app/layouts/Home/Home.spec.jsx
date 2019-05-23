import { shallow } from 'enzyme';
import React from 'react';
import Home from './Home';

let wrapper;

const setup = () =>
  shallow(
    <Home>
      <div />
    </Home>
  );

describe('<Home />', () => {
  test('should render properly', () => {
    wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
