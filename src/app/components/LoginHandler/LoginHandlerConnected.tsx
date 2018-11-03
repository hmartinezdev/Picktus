import { classicLogin, facebookLogin, googleLogin, twitterLogin } from '@store/reducers/user/user-actions';
import { connect } from 'react-redux';
import LoginHandler from './LoginHandler';

export default connect(
  undefined,
  { classicLogin, googleLogin, facebookLogin, twitterLogin }
)(LoginHandler);
