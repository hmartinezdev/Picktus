import { IReduxState } from '@store/reducers';
import { userCreation } from '@store/reducers/user/user-actions';
import { connect } from 'react-redux';
import SubscribeHandler from './SubscribeHandler';
import { IReduxStateProps } from './SubscribeHandler.type';

export const mapStateToProps = (state: IReduxState): IReduxStateProps => {
  return {
    requestStatus: state.user.userCreation || null,
  };
};

export default connect(
  mapStateToProps,
  { userCreation }
)(SubscribeHandler);
