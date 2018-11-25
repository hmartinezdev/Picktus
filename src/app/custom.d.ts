interface SvgrComponent extends React.StatelessComponent<React.SVGAttributes<SVGElement>> {}

declare module '*.svg' {
  const value: SvgrComponent;
  export default value;
}

interface PicktusUser {
  name: string;
  email: string;
  photoUrl: string;
  emailVerified: boolean;
  uid: string;
}

interface IStringMap {
  [s: string]: string;
}

enum PicktusMessageDisplayType {
  SNACKBAR = 'SNACKBAR',
  NOTIFICATION = 'NOTIFICATION',
}

enum PicktusMessageLevel {
  WARNING = 'WARNING',
  SUCCES = 'SUCCESS',
  INFO = 'INFO',
  ERROR = 'ERROR',
}

interface IPicktusMessage {
  display: PicktusMessageDisplayType;
  level: PicktusMessageLevel;
}

interface IPicktusError extends IPicktusMessage {
  level: PicktusMessageLevel.ERROR;
}
