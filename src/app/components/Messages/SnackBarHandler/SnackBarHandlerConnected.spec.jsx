import { mount, shallow } from 'enzyme';
import React from 'react';
import configureStore from 'redux-mock-store';
import SnackBarHandlerConnected from './';
import { config } from './constants';

let wrapper;
let store;

// create any initial state needed
const initialState = {
  message: {
    snackbars: [],
  },
};

// here it is possible to pass in any middleware if needed into //configureStore
const mockStore = configureStore();

const setup = (props = {}) => shallow(<SnackBarHandlerConnected {...props} />);

describe('<SnackBarHandlerConnected />', () => {
  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = setup({ store });
  });

  test('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
