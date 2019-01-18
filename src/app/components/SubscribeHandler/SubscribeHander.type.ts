import { ThunkResult } from '@store/reducers/user/user-actions';

export interface IReduxStateProps {
  loading?: boolean;
}

export interface IDispatchProps {
  userCreation: (mail: string, password: string) => ThunkResult<void>;
}

export type ISubscribeHandlerProps = IReduxStateProps & IDispatchProps;
