import { Action } from '@ngrx/store';
import { PackagePremiumRequest, PackagePremiumResponse } from '@app/house/models/package-premium';

export const NEW_BUY = '[PackagePremium] New Buy';
export const NEW_BUY_COMPLETE = '[PackagePremium] New Buy Complete';
export const NEW_BUY_FAILURE = '[PackagePremium] New Buy Failure';
export const CALCULATE = '[PackagePremium] Calculate Premium';
export const CALCULATE_COMPLETE = '[PackagePremium] Calculate Premium Complete';
export const CALCULATE_FAILURE = '[PackagePremium] Calculate Premium Failure';


export class NewBuy implements Action {
  readonly type = NEW_BUY;

  constructor(public payload: PackagePremiumRequest) {
  }
}

export class NewBuyComplete implements Action {
  readonly type = NEW_BUY_COMPLETE;

  constructor(public payload: PackagePremiumResponse) {
  }
}

export class NewBuyFailure implements Action {
  readonly type = NEW_BUY_FAILURE;

  constructor(public payload: any) {
  }
}

export class CalculatePremium implements Action {
  readonly type = CALCULATE;

  constructor(public payload: PackagePremiumRequest) {
  }
}

export class CalculatePremiumComplete implements Action {
  readonly type = CALCULATE_COMPLETE;

  constructor(public payload: PackagePremiumRequest) {
  }


}

export class CalculatePremiumFailure implements Action {
  readonly type = CALCULATE_FAILURE;

  constructor(public payload: any) {
  }
}


export type All
  = NewBuy
  | NewBuyComplete
  | NewBuyFailure
  | CalculatePremium
  | CalculatePremiumComplete
  | CalculatePremiumFailure;
