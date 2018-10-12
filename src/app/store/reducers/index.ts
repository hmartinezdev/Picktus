import { combineReducers } from 'redux';
import display, { IDisplayState } from './display';
import user, { IUserState } from './user';

export interface IReduxState {
  user: IUserState;
  display: IDisplayState;
}

export default combineReducers({
  display,
  user,
});
