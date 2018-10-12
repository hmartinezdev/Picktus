import { DisplayActions } from './display/display-actions';
import { UserActions } from './user/user-actions';

enum TypeKeys {
  OTHER_ACTION = '__any_other_action_type__',
}

interface OtherAction {
  type: TypeKeys.OTHER_ACTION;
}

export type ActionTypes = UserActions | DisplayActions | OtherAction;
