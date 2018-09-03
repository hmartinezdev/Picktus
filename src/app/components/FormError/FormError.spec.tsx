import { shallow } from 'enzyme';
import React from 'react';
import FormError from './FormError';

let wrapper;
const setup = (props = { text: 'erreur' }) => shallow(<FormError {...props} />);

describe('<FormError />', () => {
  test('should render properly', () => {
    wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
