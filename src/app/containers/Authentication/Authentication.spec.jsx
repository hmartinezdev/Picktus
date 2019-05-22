import { shallow } from 'enzyme';
import React from 'react';
import Authentication from './Authentication';

let wrapper;

const setup = () =>
  shallow(
    <Authentication>
      <div />
    </Authentication>
  );

describe('<Home />', () => {
  test('should render properly', () => {
    wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
