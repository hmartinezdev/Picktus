import { mount, shallow } from 'enzyme';
import firebase, { initializeApp } from 'firebase/app';
import React from 'react';
import App from './App';
import { config } from './constants';

let wrapper;
let spy;
const baseProps = { router: { route: 'route' } };

const setup = (props = baseProps) =>
  shallow(
    <App {...baseProps} {...props}>
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

  test('should render loader is showLoader is at true', () => {
    wrapper = setup({ showLoader: true });
    expect(wrapper).toMatchSnapshot();
  });

  describe('componentDidMount', () => {
    beforeEach(() => {
      spy = jest.spyOn(firebase, 'initializeApp').mockImplementation(() => {
        return;
      });
    });

    test('it should configure firebase properly', () => {
      const switcher = firebase;
      const mock = jest.fn().mockReturnValue('test');
      firebase = { initializeApp: mock, apps: [] };
      wrapper = setup();
      expect(mock).toHaveBeenCalled();
      firebase = switcher;
    });

    test('it should configure firebase properly', () => {
      const switcher = firebase;
      const mock = jest.fn().mockReturnValue('test');
      firebase = { initializeApp: mock, apps: ['test'] };
      wrapper = setup();
      expect(mock).toHaveBeenCalledTimes(0);
      firebase = switcher;
    });
  });
});
