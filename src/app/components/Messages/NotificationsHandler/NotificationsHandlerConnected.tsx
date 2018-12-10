import { IReduxState } from '@store/reducers';
import { dismissNotification } from '@store/reducers/message/message-actions';
import { connect } from 'react-redux';
import NotificationsHandler from './NotificationsHandler';
import { IReduxStateProps } from './NotificationsHandler.type';

const mapStateToProps = (state: IReduxState): IReduxStateProps => {
  return {
    notifications: state.message.notifications,
  };
};

export default connect(
  mapStateToProps,
  { dismissNotification }
)(NotificationsHandler);
