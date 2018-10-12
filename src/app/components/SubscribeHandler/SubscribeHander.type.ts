import { ThunkResult } from '@store/reducers/user/user-actions';

export interface IStringMap {
  [s: string]: string;
}
export interface ISubscribeHandlerState {
  open: boolean;
  inputs: IStringMap;
  errors: IStringMap;
}

export interface IReduxStateProps {
  loading?: boolean;
}

export interface IDispatchProps {
  userCreation: (mail: string, password: string) => ThunkResult<void>;
}

export type ISubscribeHandlerProps = IReduxStateProps & IDispatchProps;
