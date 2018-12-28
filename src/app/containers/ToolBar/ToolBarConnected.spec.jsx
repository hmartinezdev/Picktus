import { shallow } from 'enzyme';
import React from 'react';
import configureStore from 'redux-mock-store';
import ToolBarConnected from './';

let wrapper;
let store;

// create any initial state needed
const initialState = {};

// here it is possible to pass in any middleware if needed into //configureStore
const mockStore = configureStore();

const setup = (props = {}) => shallow(<ToolBarConnected {...props} />);

describe('<ToolBarConnected />', () => {
  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = setup({ store });
  });

  test('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
