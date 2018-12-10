import { IReduxState } from '@store/reducers';
import { connect } from 'react-redux';

import Messages from './Messages';
import { IReduxStateProps } from './Messages.type';

const mapStateToProps = (state: IReduxState): IReduxStateProps => {
  return {
    snackbars: state.message.snackbars,
  };
};

export default connect(mapStateToProps)(Messages);
