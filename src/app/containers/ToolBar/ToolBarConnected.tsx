import { signout } from '@store/reducers/user/user-actions';
import { connect } from 'react-redux';
import ToolBar from './ToolBar';

export default connect(
  undefined,
  { signout }
)(ToolBar);
