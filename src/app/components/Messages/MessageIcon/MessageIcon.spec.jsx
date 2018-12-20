import { shallow } from 'enzyme';
import React from 'react';
import MessageIcon from './MessageIcon';
import { PicktusMessageLevel } from '@store/reducers/message';

let wrapper;

const setup = (props = {}) => shallow(<MessageIcon {...props} />);

describe('<MessageIcon />', () => {
  beforeEach(() => {
    wrapper = setup();
  });

  test('should render properly', () => {
    wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  test('should render with different icon', () => {
    wrapper = setup({ level: PicktusMessageLevel.ERROR });
    expect(wrapper).toMatchSnapshot();
    wrapper = setup({ level: PicktusMessageLevel.SUCCESS });
    expect(wrapper).toMatchSnapshot();
    wrapper = setup({ level: PicktusMessageLevel.WARNING });
    expect(wrapper).toMatchSnapshot();
    wrapper = setup({ level: PicktusMessageLevel.INFO });
    expect(wrapper).toMatchSnapshot();
  });
});
