import { Action } from '@ngrx/store';
import { Settings } from '../models/settings';

export const UPDATE_SETTINGS_REQUEST =       '[Settings] Settings Request';
export const UPDATE_SETTINGS_SUCCESS =       '[Settings] Settings Success';
export const UPDATE_SETTINGS_FAILURE =          '[Settings] Settings Failure';

export class UpdateSettingsAction implements Action {
  readonly type = UPDATE_SETTINGS_REQUEST;

  constructor(public payload: any) { }
}

export class UpdateSettingsSuccessAction implements Action {
  readonly type = UPDATE_SETTINGS_SUCCESS;

  constructor(public payload: Settings) { }
}

export class UpdateSettingsFailAction implements Action {
  readonly type = UPDATE_SETTINGS_FAILURE;

  constructor(public payload: Settings) { }
}


export type All
  = UpdateSettingsAction
  | UpdateSettingsSuccessAction
  | UpdateSettingsFailAction;
