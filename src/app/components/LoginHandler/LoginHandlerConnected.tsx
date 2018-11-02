import { facebookLogin, googleLogin, twitterLogin } from '@store/reducers/user/user-actions';
import { connect } from 'react-redux';
import LoginHandler from './LoginHandler';

export default connect(
  undefined,
  { googleLogin, facebookLogin, twitterLogin }
)(LoginHandler);
