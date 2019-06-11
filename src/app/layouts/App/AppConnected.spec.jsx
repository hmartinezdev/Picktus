import { mount, shallow } from 'enzyme';
import firebase, { initializeApp } from 'firebase/app';
import React from 'react';
import configureStore from 'redux-mock-store';
import App from './';
import { config } from './constants';

let wrapper;
let spy;
const store;
// create any initial state needed
const initialState = {
    display: {
        loader: false,
    }
};
// here it is possible to pass in any middleware if needed into //configureStore
const mockStore = configureStore();

const setup = (props = {}) =>
  shallow(
    <App {...props} >
      <div />
    </App>
  );
describe('<App />', () => {
  beforeEach(() => {
    spy = jest.spyOn(firebase, 'initializeApp').mockImplementation(() => {
      return;
    });
    store = mockStore(initialState);
    wrapper = setup({store});
   
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
