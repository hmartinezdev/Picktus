import Authentication from '@services/authentication';
import { mount, shallow } from 'enzyme';
import React from 'react';
import SubscribeHandler from './SubscribeHandler';

let wrapper;
let mountWrapper;

const setup = (props = {}) => shallow(<SubscribeHandler {...props} />);

describe('<SubscribeHandler />', () => {
  beforeEach(() => {
    wrapper = setup();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
