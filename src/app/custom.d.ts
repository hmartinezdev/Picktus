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

interface IAsyncInformation {
  inProgress: boolean;
  error?: boolean;
}
