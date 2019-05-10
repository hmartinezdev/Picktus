import { PicktusMessageLevel } from '@store/reducers/message';
import { shallow } from 'enzyme';
import React from 'react';
import SnackBar from './SnackBar';

let wrapper;

const setup = () => shallow(<SnackBar text="test" level={PicktusMessageLevel.INFO} />);

describe('<SnackBar />', () => {
  test('should render properly', () => {
    wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
