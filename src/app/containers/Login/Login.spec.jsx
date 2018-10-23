import { shallow } from 'enzyme';
import React from 'react';
import Login from './Login';

let wrapper;

const setup = () =>
  shallow(
    <Login>
      <div />
    </Login>
  );

describe('<Login />', () => {
  test('should render properly', () => {
    wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
