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

type PicktusMessageLevelType =
  | PicktusMessageLevel.WARNING
  | PicktusMessageLevel.SUCCESS
  | PicktusMessageLevel.INFO
  | PicktusMessageLevel.ERROR;

type PicktusMessageDisplayType = PicktusMessageDisplay.SNACKBAR | PicktusMessageDisplay.NOTIFICATION;

interface IPicktusMessage {
  display: PicktusMessageDisplayType;
  level: PicktusMessageLevel;
  text: string;
  id: string;
}

interface IPicktusError extends IPicktusMessage {
  level: PicktusMessageLevel.ERROR;
}
