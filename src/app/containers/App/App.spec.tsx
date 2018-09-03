import { mount, shallow } from 'enzyme';
import firebase, { initializeApp } from 'firebase/app';
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

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('componentDidMount', () => {
    beforeEach(() => {
      spy = jest.spyOn(firebase, 'initializeApp').mockImplementation(() => {
        return;
      });
    });

    test('it should configure firebase properly', () => {
      wrapper = setup();
      expect(spy).toHaveBeenCalledWith(config);
    });

    test('it should configure firebase properly', () => {
      const switcher = firebase;
      firebase = { initializeApp: () => 'test', apps: ['test'] };
      wrapper = setup();
      expect(spy).toHaveBeenCalledTimes(0);
      firebase = switcher;
    });
  });
});
