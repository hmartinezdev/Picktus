import { PicktusMessageLevel } from '@store/reducers/message';
import { shallow } from 'enzyme';
import React from 'react';
import Notification from './Notification';

let wrapper;
const baseProps = { text: 'test', level: PicktusMessageLevel.INFO };

const setup = (props = baseProps) => shallow(<Notification {...props} />);

describe('<Notification />', () => {
  beforeEach(() => {
    wrapper = setup();
  });

  test('should render properly', () => {
    wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  test('should render with different icon', () => {
    wrapper = setup({ level: PicktusMessageLevel.ERROR, text: 'error' });
    expect(wrapper).toMatchSnapshot();
    wrapper = setup({ level: PicktusMessageLevel.SUCCESS, text: 'error' });
    expect(wrapper).toMatchSnapshot();
    wrapper = setup({ level: PicktusMessageLevel.WARNING, text: 'error' });
    expect(wrapper).toMatchSnapshot();
    wrapper = setup({ level: PicktusMessageLevel.INFO, text: 'error' });
    expect(wrapper).toMatchSnapshot();
  });
});
