export interface IUserState {
  authenticated: boolean;
  userCreation?: IAsyncInformation;
  user?: PicktusUser;
}
