import { DisplayActions } from './display/display-actions';
import { MessageActions } from './message/message-actions';
import { UserActions } from './user/user-actions';

export enum OtherTypeKeys {
  OTHER_ACTION = '__any_other_action_type__',
}

export interface OtherAction {
  type: OtherTypeKeys.OTHER_ACTION;
}

export type ActionTypes = UserActions | DisplayActions | MessageActions | OtherAction;
