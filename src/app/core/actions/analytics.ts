import { Action } from '@ngrx/store';
import {
  PageViewAnalyticsEvent,
  ClickoutAnalyticsEvent,
  CoverageAdviceAnalyticsEvent,
  CarDataAnaylitcsEvent
} from '@app/core/models/analytics';

export const ANALITYCS_PAGE_VIEW_EVENT =                 '[Analytics] Page View Event';
export const ANALITYCS_CLICK_OUT_EVENT =                 '[Analytics] Click Out Event';
export const ANALITYCS_CAR_DATA_AVAILABLE_EVENT =        '[Analytics] Car Data Available Event';
export const ANALITYCS_COVERAGE_ADVICE_AVAILABLE_EVENT = '[Analytics] Car Coverage Available Event';

export class PageViewEventAction implements Action {
  readonly type = ANALITYCS_PAGE_VIEW_EVENT;

  constructor(public payload: PageViewAnalyticsEvent) { }
}

export class ClickOutEventAction implements Action {
  readonly type = ANALITYCS_CLICK_OUT_EVENT;

  constructor(public payload: ClickoutAnalyticsEvent) { }
}

export class CarDataAvailableAction implements Action {
  readonly type = ANALITYCS_CAR_DATA_AVAILABLE_EVENT;

  constructor(public payload: CarDataAnaylitcsEvent) { }
}

export class CoverageAdviceAvailableAction implements Action {
  readonly type = ANALITYCS_COVERAGE_ADVICE_AVAILABLE_EVENT;

  constructor(public payload: CoverageAdviceAnalyticsEvent) { }
}

export type All
  = PageViewEventAction
  | ClickOutEventAction
  | CoverageAdviceAnalyticsEvent
  | CarDataAvailableAction;
