import { signin } from '@store/reducers/user/user-actions';
import { connect } from 'react-redux';
import LoginHandler from './LoginHandler';

export default connect(
  undefined,
  { signin }
)(LoginHandler);
