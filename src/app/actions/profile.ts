import { Action } from '@ngrx/store';
import { Profile } from '../models/profile';

export const LOAD_PROFILE_REQUEST = '[Profile] Load Request';
export const LOAD_PROFILE_SUCCESS = '[Profile] Load Success';
export const LOAD_PROFILE_FAIL = '[Profile] Load Fail';
export const LOAD_PROFILE_COMPLETE = '[Profile] Load Complete';

// FETCH_USER_REQUEST - for when you first send the api call
// FETCH_USER_SUCCESS - for when the api call is done and successfully returned data
// FETCH_USER_FAIL - for when the api call failed and responded with an error,
// FETCH_USER_COMPLETE - sometimes used at the end of the call regardless of status


export class LoadAction implements Action {
  readonly type = LOAD_PROFILE_REQUEST;

  constructor(public payload: Profile) { }
}

export class LoadSuccessAction implements Action {
  readonly type = LOAD_PROFILE_SUCCESS;

  constructor(public payload: Profile) { }
}

export class LoadFailAction implements Action {
  readonly type = LOAD_PROFILE_FAIL;

  constructor(public payload: Profile) { }
}

export class LoadCompleteAction implements Action {
  readonly type = LOAD_PROFILE_COMPLETE;

  constructor(public payload: Profile) { }
}


export type Actions
  = LoadAction
  | LoadSuccessAction
  | LoadFailAction
  | LoadCompleteAction;
