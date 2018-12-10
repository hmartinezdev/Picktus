import { IReduxState } from '@store/reducers';
import { dismissSnackBar } from '@store/reducers/message/message-actions';
import { connect } from 'react-redux';
import SnackBarHandler from './SnackBarHandler';
import { IReduxStateProps } from './SnackBarHandler.type';

const mapStateToProps = (state: IReduxState): IReduxStateProps => {
  return {
    snackbars: state.message.snackbars,
  };
};

export default connect(
  mapStateToProps,
  { dismissSnackBar }
)(SnackBarHandler);
