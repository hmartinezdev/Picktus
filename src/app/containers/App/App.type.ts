import { UserLoginSuccess } from '@store/reducers/user/user-actions';
import firebase from 'firebase';
import { WithRouterProps } from 'next/router';

export interface IReduxStateProps {
  showLoader: boolean;
}

export interface IAppOwnProps {
  children: JSX.Element[] | JSX.Element;
  showLoader: boolean;
}

export interface IDispatchProps {
  userLoginSuccess: (user: firebase.User) => UserLoginSuccess;
}

export type IAppPropsType = IDispatchProps & IReduxStateProps & IAppOwnProps & WithRouterProps;
