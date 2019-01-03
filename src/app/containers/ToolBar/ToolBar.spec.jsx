import { shallow } from 'enzyme';
import React from 'react';
import ToolBar from './ToolBar';

let wrapper;

const setup = () => shallow(<ToolBar />);

describe('<ToolBar />', () => {
  test('should render properly', () => {
    wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
