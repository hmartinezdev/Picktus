import { facebookLogin, googleLogin } from '@store/reducers/user/user-actions';
import { connect } from 'react-redux';
import LoginHandler from './LoginHandler';

export default connect(
  undefined,
  { googleLogin, facebookLogin }
)(LoginHandler);
