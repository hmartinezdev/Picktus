import { IReduxState } from '@store/reducers';
import { connect } from 'react-redux';

import MessageHandler from './MessageHandler';
import { IReduxStateProps } from './MessageHandler.type';

const mapStateToProps = (state: IReduxState): IReduxStateProps => {
  return {
    notifications: state.message.notifications,
    snackbars: state.message.snackbars,
  };
};

export default connect(mapStateToProps)(MessageHandler);
