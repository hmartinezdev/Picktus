import { IReduxState } from '@store/reducers';
import { userLoginSuccess } from '@store/reducers/user/user-actions';
import { connect } from 'react-redux';
import App from './App';
import { IReduxStateProps } from './App.type';

const mapStateToProps = (state: IReduxState): IReduxStateProps => {
  return {
    showLoader: state.display.loader,
  };
};

export default connect(
  mapStateToProps,
  { userLoginSuccess }
)(App);
