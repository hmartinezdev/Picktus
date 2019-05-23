import { shallow } from 'enzyme';
import React from 'react';
import configureStore from 'redux-mock-store';
import SubscribeHandlerConnected from './';

let wrapper: any;
let store;

// create any initial state needed
const initialState = {
  user: {
    creationInProgress: false,
  },
};

// here it is possible to pass in any middleware if needed into //configureStore
const mockStore = configureStore();

const setup = (props = {}) => shallow(<SubscribeHandlerConnected {...props} />);

describe('<SubscribeHandlerConnected />', () => {
  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = setup({ store });
  });

  test('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
