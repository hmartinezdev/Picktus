import { ThunkResult } from '@store/reducers/user/user-actions';

export interface ISubscribeStepInfos {
  control: (value: string) => boolean;
  name: string;
  errorMessage: string;
  title: string;
  type: string;
}

export interface IReduxStateProps {
  loading?: boolean;
}

export interface IDispatchProps {
  userCreation: (mail: string, password: string) => ThunkResult<void>;
}

export interface ISubscribeHandlerState {
  values: IStringMap;
  current: number;
}

export type ISubscribeHandlerProps = IReduxStateProps & IDispatchProps;
