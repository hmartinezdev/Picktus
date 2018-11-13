export enum SigninMethods {
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
  TWITTER = 'TWITTER',
  CLASSIC = 'CLASSIC',
}

export type ISigninMethodsMap = { [s in SigninMethods]: any };
