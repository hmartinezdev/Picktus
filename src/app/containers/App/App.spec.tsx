import React from 'react';
import { shallow } from 'enzyme';
import { config } from './constants';
import firebase from 'firebase/app';
import App from './App';

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
    spy = jest.spyOn(firebase, 'initializeApp').mockImplementation(() => {});
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
