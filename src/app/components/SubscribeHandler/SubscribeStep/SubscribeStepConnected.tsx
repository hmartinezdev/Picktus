import { displaySnackBar } from '@store/reducers/message/message-actions';
import { connect } from 'react-redux';
import SubscribeStep from './SubscribeStep';

export default connect(
  undefined,
  { displaySnackBar }
)(SubscribeStep);
