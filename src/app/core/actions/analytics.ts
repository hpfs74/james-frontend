import { Action } from '@ngrx/store';

export class AnalyticsAction implements Action {
  readonly type = '[Analytics] Event';

  constructor(public payload: any) { }
}
