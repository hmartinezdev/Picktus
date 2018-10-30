export interface IUserState {
  authenticated: boolean;
  creationInProgress?: boolean;
  user?: PicktusUser;
}
