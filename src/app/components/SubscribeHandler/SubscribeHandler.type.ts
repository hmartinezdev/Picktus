export interface ISubscribeStepInfos {
  control: (value: string) => boolean;
  name: string;
  errorMessage: string;
  title: string;
  type: string;
}

export interface IReduxStateProps {
  requestStatus: IAsyncInformation | null;
}

export interface IDispatchProps {
  userCreation: (mail: string, password: string) => any;
}

export interface ISubscribeHandlerState {
  values: IStringMap;
  current: number;
}

export type ISubscribeHandlerProps = IReduxStateProps & IDispatchProps;
