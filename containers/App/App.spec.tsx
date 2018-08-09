import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

let wrapper;

const setup = () => shallow(<App />);

describe('<App />', () => {
  test('should render properly', () => {
    wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
