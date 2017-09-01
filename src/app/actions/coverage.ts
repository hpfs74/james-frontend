import { Action } from '@ngrx/store';

export const CAR_COVERAGE_REQUEST =     '[Car] Coverage';
export const CAR_COVERAGE_SUCCESS =     '[Car] Coverage Success';
export const CAR_COVERAGE_FAILURE =        '[Car] Coverage Failure';


export class CarCoverageAction implements Action {
  readonly type = CAR_COVERAGE_REQUEST;

  constructor(public payload: any) { }
}

export class CarCoverageCompleteAction implements Action {
  readonly type = CAR_COVERAGE_SUCCESS;

  constructor(public payload: any) { }
}

export class CarCoverageFailAction implements Action {
  readonly type = CAR_COVERAGE_FAILURE;

  constructor(public payload: any) { }
}

export type All
  = CarCoverageAction
  | CarCoverageCompleteAction
  | CarCoverageFailAction;
