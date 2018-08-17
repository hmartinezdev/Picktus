import firebase from '@firebase/app';
import { shallow } from 'enzyme';
import React from 'react';
import App from './App';
import { config } from './constants';

let wrapper;
let spy;

const setup = () =>
  shallow(
    <App>
      <div />
    </App>
  );

describe('<App />', () => {
  beforeAll(() => {
    spy = jest.spyOn(firebase, 'initializeApp').mockImplementation(() => {
      return;
    });
    wrapper = setup();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('componentDidMount', () => {
    test('it should configure firebase properly', () => {
      expect(spy).toHaveBeenCalledWith(config);
    });
  });
});
