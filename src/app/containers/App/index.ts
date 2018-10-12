import { IReduxState } from '@store/reducers';
import { connect } from 'react-redux';
import App from './App';
import { IReduxStateProps } from './App.type';

const mapStateToProps = (state: IReduxState): IReduxStateProps => {
  return {
    showLoader: state.display.loader,
  };
};

export default connect(mapStateToProps)(App);
