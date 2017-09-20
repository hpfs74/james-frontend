import { Action } from '@ngrx/store';
import { Profile } from '../models/profile';

export const LOAD_PROFILE_REQUEST =   '[Profile] Load Request';
export const LOAD_PROFILE_SUCCESS =   '[Profile] Load Success';
export const LOAD_PROFILE_FAILURE =      '[Profile] Load Failure';

export const UPDATE_PROFILE =         '[Profile] Update (Local)';

export const SAVE_PROFILE_REQUEST =   '[Profile] Save Request';
export const SAVE_PROFILE_SUCCESS =   '[Profile] Save Success';
export const SAVE_PROFILE_FAILURE =      '[Profile] Save Fail';

export const UPDATE_ADDRESS_REQUEST = '[Profile] Update Address Request';
export const UPDATE_ADDRESS_SUCCESS = '[Profile] Update Address Success';
export const UPDATE_ADDRESS_FAILURE =    '[Profile] Update Address Failure';


export class LoadAction implements Action {
  readonly type = LOAD_PROFILE_REQUEST;
}

export class LoadSuccessAction implements Action {
  readonly type = LOAD_PROFILE_SUCCESS;

  constructor(public payload: Profile) { }
}

export class LoadFailAction implements Action {
  readonly type = LOAD_PROFILE_FAILURE;

  constructor(public payload: Profile) { }
}

export class UpdateAction implements Action {
  readonly type = UPDATE_PROFILE;

  constructor(public payload: any) { }
}

export class SaveAction implements Action {
  readonly type = SAVE_PROFILE_REQUEST;

  constructor(public payload: Profile) { }
}

export class SaveSuccessAction implements Action {
  readonly type = SAVE_PROFILE_SUCCESS;

  constructor(public payload: Profile) { }
}

export class SaveFailAction implements Action {
  readonly type = SAVE_PROFILE_FAILURE;

  constructor(public payload: Profile) { }
}

export class UpdateAddressAction implements Action {
  readonly type = UPDATE_ADDRESS_REQUEST;

  constructor(public payload: Profile) { }
}

export class UpdateAddressSuccessAction implements Action {
  readonly type = UPDATE_ADDRESS_SUCCESS;

  constructor(public payload: Profile) { }
}

export class UpdateAddressFailAction implements Action {
  readonly type = UPDATE_ADDRESS_FAILURE;

  constructor(public payload: Profile) { }
}


export type All
  = LoadAction
  | LoadSuccessAction
  | LoadFailAction
  | UpdateAction
  | SaveAction
  | SaveSuccessAction
  | SaveFailAction
  | UpdateAddressAction
  | UpdateAddressSuccessAction
  | UpdateAddressFailAction;
