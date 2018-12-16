import { ISigninOptions, SigninMethods } from '@services/authentication';
import { ThunkResult } from '@store/reducers/user/user-actions';

export interface ILoginHandlerState {
  inputs: IStringMap;
}

export interface IDispatchProps {
  signin: (method: SigninMethods, options: ISigninOptions) => ThunkResult<void>;
}

export type ILoginHandlerProps = IDispatchProps;
