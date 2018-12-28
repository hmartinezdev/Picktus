import { ThunkResult } from '@store/reducers/user/user-actions';

export interface IDispatchProps {
  signout: () => ThunkResult<void>;
}

export type IToolBarProps = IDispatchProps;
