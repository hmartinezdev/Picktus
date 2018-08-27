import enzyme, { shallow } from 'enzyme';
import React from 'react';
import SubscribeHandler from './SubscribeHandler';

let wrapper: enzyme.ShallowWrapper;

const setup = (props = {}) => shallow(<SubscribeHandler {...props} />);

describe('<SubscribeHandler />', () => {
  beforeEach(() => {
    wrapper = setup();
  });

  test('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
