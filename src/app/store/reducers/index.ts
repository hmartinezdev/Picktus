import { combineReducers } from 'redux';
import display, { IDisplayState } from './display';
import message, { IMessageState } from './message';
import user, { IUserState } from './user';

export interface IReduxState {
  user: IUserState;
  display: IDisplayState;
  message: IMessageState;
}

export default combineReducers({
  display,
  message,
  user,
});
