import { ThunkResult } from '@store/reducers/user/user-actions';

export interface IDispatchProps {
  signout: () => any;
}

export type IToolBarProps = IDispatchProps;
