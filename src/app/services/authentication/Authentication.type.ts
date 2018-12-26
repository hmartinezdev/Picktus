export type delegatedMethods = SigninMethods.GOOGLE | SigninMethods.FACEBOOK | SigninMethods.TWITTER;

export type classicMethod = SigninMethods.CLASSIC;

export enum SigninMethods {
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
  TWITTER = 'TWITTER',
  CLASSIC = 'CLASSIC',
}

export enum FirebaseErrorCodes {
  TOO_MANY_REQUEST = 'auth/too-many-requests',
  NETWOR_REQUEST_FAILED = 'auth/network-request-failed',
  INVALID_API_KEY = 'auth/invalid-api-key',
  INVALID_EMAIL = 'auth/invalid-email',
  USER_NOT_FOUND = 'auth/user-not-found',
  WRONG_PASSWORD = 'auth/wrong-password',
  ACCOUNT_ALREADY_EXIST_WITH_DIFFERENT_CREDENTIAL = 'auth/account-exists-with-different-credential',
  EMAIL_ALREADY_USED = 'auth/email-already-in-use',
  POPUP_BLOCKED = 'auth/popup-blocked',
  WEAK_PASSWORD = 'auth/weak-password',
  CANCELLED_POPUP = 'auth/cancelled-popup-request',
}

export interface ISigninOptions {
  email?: string;
  password?: string;
}

export type ISigninMethodsMap = { [s in SigninMethods]: any };
