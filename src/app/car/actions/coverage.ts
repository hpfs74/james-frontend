import { Action } from '@ngrx/store';
import { CarCoverageRecommendation, CarCoverageDetails } from '../models/coverage';

export const CAR_COVERAGE_REQUEST =     '[Car] Coverage';
export const CAR_COVERAGE_SUCCESS =     '[Car] Coverage Success';
export const CAR_COVERAGE_FAILURE =      '[Car] Coverage Failure';

export const CAR_COVERAGE_SET_ACTIVE_LOAN = '[Car] Set  Active Loan';

export class CarCoverageAction implements Action {
  readonly type = CAR_COVERAGE_REQUEST;

  constructor(public payload: CarCoverageDetails) {}
}

export class CarCoverageCompleteAction implements Action {
  readonly type = CAR_COVERAGE_SUCCESS;

  constructor(public payload: CarCoverageRecommendation) {}
}

export class CarCoverageFailureAction implements Action {
  readonly type = CAR_COVERAGE_FAILURE;

  constructor(public payload: any) {}
}

export class CarCoverageSetActiveLoan implements Action {
  readonly type = CAR_COVERAGE_SET_ACTIVE_LOAN;

  constructor(public payload: boolean) {}
}

export type All
  = CarCoverageAction
  | CarCoverageCompleteAction
  | CarCoverageFailureAction
  | CarCoverageSetActiveLoan;
