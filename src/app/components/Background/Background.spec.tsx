import React from 'react';
import { shallow } from 'enzyme';
import Background from './Background';

let wrapper;

const setup = () =>
  shallow(
    <Background>
      <div />
    </Background>
  );

describe('<Background />', () => {
  test('should render properly', () => {
    wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
