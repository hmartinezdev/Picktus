import enzyme, { shallow } from 'enzyme';
import React from 'react';
import LoginHandler from './LoginHandler';

let wrapper: enzyme.ShallowWrapper;

const setup = (props = {}) => shallow(<LoginHandler {...props} />);

describe('<LoginHandler />', () => {
  beforeEach(() => {
    wrapper = setup();
  });

  test('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
