import { Action } from '@ngrx/store';
import { AnalyticsEvent } from '@app/core/models/analytics';

export const ANALITYCS_EVENT = '[Analytics] Event';

export class EventAction implements Action {
  readonly type = ANALITYCS_EVENT;

  constructor(public payload: AnalyticsEvent) { }
}

export type All
  = EventAction;
