export type delegatedMethods = SigninMethods.GOOGLE | SigninMethods.FACEBOOK | SigninMethods.TWITTER;

export type classicMethod = SigninMethods.CLASSIC;

export enum SigninMethods {
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
  TWITTER = 'TWITTER',
  CLASSIC = 'CLASSIC',
}

export interface ISigninOptions {
  email?: string;
  password?: string;
}

export type ISigninMethodsMap = { [s in SigninMethods]: any };
