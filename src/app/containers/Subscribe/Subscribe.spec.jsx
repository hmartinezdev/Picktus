import { shallow } from 'enzyme';
import React from 'react';
import Subscribe from './Subscribe';

let wrapper;

const setup = () =>
  shallow(
    <Subscribe>
      <div />
    </Subscribe>
  );

describe('<Subscribe />', () => {
  test('should render properly', () => {
    wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
