import { ThunkResult } from '@store/reducers/user/user-actions';

export interface ILoginHandlerState {
  inputs: IStringMap;
}

export interface IDispatchProps {
  googleLogin: () => ThunkResult<void>;
  facebookLogin: () => ThunkResult<void>;
  twitterLogin: () => ThunkResult<void>;
}

export type ILoginHandlerProps = IDispatchProps;
