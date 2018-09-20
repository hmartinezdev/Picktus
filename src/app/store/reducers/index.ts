import { combineReducers } from 'redux';
import user, { UserState } from './user';

export interface IReduxState {
  user: UserState;
}

export default combineReducers({
  user,
});
