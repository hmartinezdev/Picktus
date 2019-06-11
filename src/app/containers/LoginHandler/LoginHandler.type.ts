import { ISigninOptions, SigninMethods } from '@services/authentication';

export interface ILoginHandlerState {
  inputs: IStringMap;
}

export interface IDispatchProps {
  signin: (method: SigninMethods, options: ISigninOptions) => any;
}

export type ILoginHandlerProps = IDispatchProps;
