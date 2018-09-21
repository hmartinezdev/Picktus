import { combineReducers } from 'redux';
import user, { IUserState } from './user';

export interface IReduxState {
  user: IUserState;
}

export default combineReducers({
  user,
});
